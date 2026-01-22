from decimal import Decimal
from typing import Any, Dict, List, Tuple
from datetime import datetime

from django.db import transaction
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password
import logging

from apps.policies.models import Policy, PolicyStatusUpdate
from apps.products.models import Product
from apps.schemes.models import SchemeGroup
from apps.users.models import User, Membership, MembershipStatusUpdate
from apps.payments.models import Premium, PayerDetail
from apps.credit_life.models import Creditor

logger = logging.getLogger(__name__)


class CreditLifePolicyPurchaseService:
    """Service for purchasing credit life policies with creditors and payment details."""
    
    DEFAULT_PASSWORD = "1234"
    
    def __init__(self, data: Dict[str, Any]):
        self.data = data
        self._validate_required_data()
    
    def _validate_required_data(self) -> None:
        """Validate that required data is present."""
        required_fields = ["product", "start_date", "members"]
        missing_fields = [field for field in required_fields if not self.data.get(field)]
        
        if missing_fields:
            raise ValidationError(f"Missing required fields: {', '.join(missing_fields)}")
        
        if not self.data.get("members") or len(self.data["members"]) == 0:
            raise ValidationError("At least one member is required")
    
    @transaction.atomic
    def execute(self) -> Dict[str, Any]:
        """Execute the policy purchase process."""
        try:
            logger.info(f"Starting policy purchase for product {self.data.get('product')}")
            
            product = self._get_product()
            policy, scheme_group = self._create_policy_and_scheme_group(product)
            membership = self._create_membership(scheme_group)
            
            self._create_creditors(membership)
            self._create_payer_details(policy, scheme_group)
            self._create_premium_record(membership)
            
            logger.info(f"Successfully created policy {policy.policy_number}")
            
            return {
                "success": True,
                "policy_id": policy.id,
                "policy_number": policy.policy_number,
                "membership_id": membership.id
            }
            
        except Exception as e:
            logger.error(f"Policy purchase failed: {str(e)}")
            raise
    
    def _get_product(self) -> Product:
        """Get and validate the product."""
        try:
            return Product.objects.get(id=self.data["product"])
        except Product.DoesNotExist:
            raise ValidationError(f"Product with id {self.data['product']} does not exist")
    
    def _create_policy_and_scheme_group(self, product: Product) -> Tuple[Policy, SchemeGroup]:
        """Create policy and associated scheme group."""
        policy = Policy.objects.create(
            product=product,
            start_date=self.data["start_date"],
            policy_number=product.next_policy_number(),
            cover_amount=Decimal('0'),
            premium=Decimal('0')
        )
        
        PolicyStatusUpdate.objects.create(policy=policy)
        
        scheme_group = SchemeGroup.objects.create(
            scheme=product.scheme,
            policy=policy
        )
        
        return policy, scheme_group
    
    def _create_membership(self, scheme_group: SchemeGroup) -> Membership:
        """Create membership for the main member."""
        member_data = self.data["members"][0]
        user = self._create_user(member_data)
        
        membership = Membership.objects.create(
            user=user,
            policy=scheme_group.policy,
            scheme_group=scheme_group,
            main_member_premium=self._to_decimal(member_data.get("premium", 0)),
            main_member_cover_amount=self._to_decimal(member_data.get("cover_amount", 0)),
            dependent_cover_amount=Decimal('0'),
            dependent_premium=Decimal('0'),
            total_cover_amount=Decimal('0'),
            total_premium=Decimal('0')
        )
        
        MembershipStatusUpdate.objects.create(membership=membership)
        
        return membership
    
    def _create_creditors(self, membership: Membership) -> None:
        """Create creditor records and update membership totals."""
        creditors = self.data.get("creditors", [])
        
        for creditor_data in creditors:
            creditor = self._create_single_creditor(membership, creditor_data)
            self._update_membership_totals(membership, creditor)
    
    def _create_single_creditor(self, membership: Membership, creditor_data: Dict[str, Any]) -> Creditor:
        """Create a single creditor record."""
        return Creditor.objects.create(
            membership=membership,
            policy=membership.policy,
            scheme_group=membership.scheme_group,
            creditor_name=self._clean_string(creditor_data.get("creditor_name", "")),
            contact_person_name=self._clean_string(creditor_data.get("contact_person_name", "")),
            contact_person_email=self._clean_string(creditor_data.get("contact_person_email", "")),
            contact_person_phone_number=self._clean_string(creditor_data.get("contact_person_phone_number", "")),
            address=self._clean_string(creditor_data.get("address", "")),
            town=self._clean_string(creditor_data.get("town", "")),
            country=self._clean_string(creditor_data.get("country", "")),
            date_registered=creditor_data.get("date_registered", datetime.now().date()),
            loan_reference=self._clean_string(creditor_data.get("loan_reference", "")),
            loan_amount=self._to_decimal(creditor_data.get("loan_amount", 0)),
            outstanding_balance=self._to_decimal(creditor_data.get("outstanding_balance", 0)),
            premium=self._to_decimal(creditor_data.get("premium", 0)),
            term_months=creditor_data.get("term_months", 1),
            declining_term=creditor_data.get("declining_term", False)
        )
    
    def _update_membership_totals(self, membership: Membership, creditor: Creditor) -> None:
        """Update membership and policy totals with creditor amounts."""
        outstanding_balance = Decimal(str(creditor.outstanding_balance))
        premium = Decimal(str(creditor.premium))
        
        # Update membership totals
        membership.total_premium += premium
        membership.total_cover_amount += outstanding_balance
        membership.main_member_cover_amount += outstanding_balance
        membership.main_member_premium += premium
        
        membership.save(update_fields=[
            'main_member_premium',
            'main_member_cover_amount',
            'total_premium',
            'total_cover_amount',
        ])
        
        # Update policy totals
        membership.policy.cover_amount += outstanding_balance
        membership.policy.premium += premium
        membership.policy.save(update_fields=['cover_amount', 'premium'])
    
    def _create_payer_details(self, policy: Policy, scheme_group: SchemeGroup) -> None:
        """Create payer details for the policy."""
        payment_details = self.data.get("payment_details", {})
        
        PayerDetail.objects.create(
            policy=policy,
            scheme_group=scheme_group,
            bank_name=self._clean_string(payment_details.get('bank_name', '')),
            account_type=self._clean_string(payment_details.get('account_type', '')),
            account_name=self._clean_string(payment_details.get('account_name', '')),
            account_number=self._clean_string(payment_details.get('account_number', '')),
            branch_code=self._clean_string(payment_details.get('branch_code', '')),
            debit_order_date=payment_details.get('debit_order_date'),
            source_of_funds=self._clean_string(payment_details.get('source_of_funds', ''))
        )
    
    def _create_premium_record(self, membership: Membership) -> None:
        """Create premium record for the membership."""
        Premium.objects.create(
            policy=membership.policy,
            scheme_group=membership.scheme_group,
            membership=membership,
            expected_amount=membership.policy.premium,
            balance=membership.policy.premium,
            expected_date=membership.policy.start_date
        )
    
    def _create_user(self, user_data: Dict[str, Any]) -> User:
        """Create a new user with the provided data."""
        required_user_fields = ["first_name", "last_name", "email"]
        missing_fields = [field for field in required_user_fields if not user_data.get(field)]
        
        if missing_fields:
            raise ValidationError(f"Missing required user fields: {', '.join(missing_fields)}")
        
        return User.objects.create(
            first_name=self._clean_string(user_data["first_name"]),
            last_name=self._clean_string(user_data["last_name"]),
            email=self._clean_string(user_data["email"]),
            gender=self._clean_string(user_data.get("gender", "")),
            phone_number=self._clean_string(user_data.get("phone_number", "")),
            id_number=self._clean_string(user_data.get("id_number", "")),
            address=self._clean_string(user_data.get("address", "")),
            town=self._clean_string(user_data.get("town", "")),
            country=self._clean_string(user_data.get("country", "")),
            username=self._clean_string(user_data["email"]),
            password=make_password(self.DEFAULT_PASSWORD)
        )
    
    @staticmethod
    def _clean_string(value: str) -> str:
        """Clean and strip string values."""
        return str(value).strip() if value else ""
    
    @staticmethod
    def _to_decimal(value: Any) -> Decimal:
        """Convert value to Decimal safely."""
        try:
            return Decimal(str(value)) if value else Decimal('0')
        except (ValueError, TypeError):
            return Decimal('0')