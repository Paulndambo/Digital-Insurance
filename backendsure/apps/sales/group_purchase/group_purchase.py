from decimal import Decimal
from typing import Any, Dict, List, Tuple
from django.db import transaction
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password
import logging

from apps.policies.models import Policy, PolicyStatusUpdate
from apps.products.models import Product
from apps.schemes.models import SchemeGroup
from apps.payments.models import Premium
from apps.family.models import Dependent, Beneficiary
from apps.users.models import User, Membership, MembershipStatusUpdate
from apps.payments.models import Premium, PayerDetail

logger = logging.getLogger(__name__)


class PolicyCreationError(Exception):
    """Custom exception for policy creation errors"""
    pass


class GroupPolicyPurchaseService:
    """
    Service class for handling group policy purchases.
    
    This class encapsulates the business logic for creating group policies,
    including members, dependents, beneficiaries, and payment details.
    """
    
    def __init__(self, data: Dict[str, Any]):
        self.data = data
        self._validate_input_data()
        
    def _validate_input_data(self) -> None:
        """Validate required input data"""
        required_fields = ['product', 'members', 'start_date']
        missing_fields = [field for field in required_fields if not self.data.get(field)]
        
        if missing_fields:
            raise ValidationError(f"Missing required fields: {', '.join(missing_fields)}")
            
        if not isinstance(self.data.get('members'), list) or not self.data['members']:
            raise ValidationError("At least one member is required")
    
    @transaction.atomic
    def execute(self) -> Tuple[Policy, SchemeGroup]:
        """
        Execute the group policy purchase process.
        
        Returns:
            Tuple[Policy, SchemeGroup]: Created policy and scheme group
            
        Raises:
            PolicyCreationError: If policy creation fails
            ValidationError: If input data is invalid
        """
        try:
            logger.info(f"Starting group policy purchase for product {self.data.get('product')}")
            
            product = self._get_product()
            financial_summary = self._calculate_financial_totals()
            
            policy, scheme_group = self._create_policy_and_scheme(
                product=product,
                premium=financial_summary['total_premium'],
                cover_amount=financial_summary['total_cover_amount']
            )
            
            self._create_memberships_batch(
                scheme_group=scheme_group,
                members=self.data.get('members', []),
                dependents=self.data.get('dependents', []),
                beneficiaries=self.data.get('beneficiaries', [])
            )
            
            self._create_payer_details(
                payment_details=self.data.get('payment_details', {}),
                policy=policy,
                scheme_group=scheme_group
            )
            
            logger.info(f"Successfully created group policy {policy.policy_number}")
            return policy, scheme_group
            
        except Exception as e:
            logger.error(f"Failed to create group policy: {str(e)}")
            raise PolicyCreationError(f"Policy creation failed: {str(e)}") from e
    
    def _get_product(self) -> Product:
        """Get and validate product"""
        try:
            return Product.objects.select_related('scheme').get(
                id=self.data['product']
            )
        except Product.DoesNotExist:
            raise ValidationError(f"Product with id {self.data['product']} does not exist")
    
    def _calculate_financial_totals(self) -> Dict[str, Decimal]:
        """Calculate total premiums and cover amounts"""
        members = self.data.get('members', [])
        dependents = self.data.get('dependents', [])
        
        # Use Decimal for all calculations to avoid floating point errors
        member_cover_total = sum(
            (Decimal(str(member.get('cover_amount', 0))) for member in members),
            Decimal('0')
        )
        member_premium_total = sum(
            (Decimal(str(member.get('premium', 0))) for member in members),
            Decimal('0')
        )
        
        dependent_cover_total = sum(
            (Decimal(str(dependent.get('cover_amount', 0))) for dependent in dependents),
            Decimal('0')
        )
        dependent_premium_total = sum(
            (Decimal(str(dependent.get('premium', 0))) for dependent in dependents),
            Decimal('0')
        )
        
        return {
            'member_cover_total': member_cover_total,
            'member_premium_total': member_premium_total,
            'dependent_cover_total': dependent_cover_total,
            'dependent_premium_total': dependent_premium_total,
            'total_cover_amount': member_cover_total + dependent_cover_total,
            'total_premium': member_premium_total + dependent_premium_total
        }
    
    def _create_policy_and_scheme(
        self, 
        product: Product, 
        premium: Decimal, 
        cover_amount: Decimal
    ) -> Tuple[Policy, SchemeGroup]:
        """Create policy and associated scheme group"""
        policy = Policy.objects.create(
            product=product,
            start_date=self.data['start_date'],
            policy_number=product.next_policy_number(),
            premium=premium,
            cover_amount=cover_amount
        )
        
        PolicyStatusUpdate.objects.create(policy=policy)
        
        scheme_group = SchemeGroup.objects.create(
            scheme=product.scheme,
            policy=policy
        )
        
        return policy, scheme_group
    
    def _create_memberships_batch(
        self,
        scheme_group: SchemeGroup,
        members: List[Dict[str, Any]],
        dependents: List[Dict[str, Any]],
        beneficiaries: List[Dict[str, Any]]
    ) -> None:
        """Create all memberships with their associated records"""
        for member_data in members:
            try:
                self._create_single_membership(
                    scheme_group=scheme_group,
                    member_data=member_data,
                    dependents=dependents,
                    beneficiaries=beneficiaries
                )
            except Exception as e:
                logger.error(f"Failed to create membership for {member_data.get('email', 'unknown')}: {str(e)}")
                raise
    
    def _create_single_membership(
        self,
        scheme_group: SchemeGroup,
        member_data: Dict[str, Any],
        dependents: List[Dict[str, Any]],
        beneficiaries: List[Dict[str, Any]]
    ) -> None:
        """Create a single membership with all associated records"""
        # Create user
        user = self._create_user(member_data)
        
        # Create membership
        membership = Membership.objects.create(
            user=user,
            policy=scheme_group.policy,
            scheme_group=scheme_group,
            main_member_premium=Decimal(str(member_data.get('premium', 0))),
            main_member_cover_amount=Decimal(str(member_data.get('cover_amount', 0)))
        )
        
        MembershipStatusUpdate.objects.create(membership=membership)
        
        # Filter dependents and beneficiaries for this member
        member_dependents = self._filter_by_main_member(
            dependents, member_data.get('id_number', '')
        )
        member_beneficiaries = self._filter_by_main_member(
            beneficiaries, member_data.get('id_number', '')
        )
        
        # Calculate total premium including dependents
        dependent_premium_total = sum(
            (Decimal(str(dep.get('premium', 0))) for dep in member_dependents),
            Decimal('0')
        )
        total_membership_premium = (
            Decimal(str(member_data.get('premium', 0))) + dependent_premium_total
        )
        
        logger.info(
            f"Creating membership for {member_data.get('first_name', 'Unknown')} "
            f"with {len(member_dependents)} dependents and {len(member_beneficiaries)} beneficiaries"
        )
        
        # Create associated records
        self._create_premium(membership, total_membership_premium)
        self._create_dependents(membership, member_dependents)
        self._create_beneficiaries(membership, member_beneficiaries)
    
    def _create_user(self, member_data: Dict[str, Any]) -> User:
        """Create a user with proper validation"""
        email = member_data.get('email', '').strip()
        if not email:
            raise ValidationError("Email is required for member")
            
        # Check if user already exists
        if User.objects.filter(email=email).exists():
            raise ValidationError(f"User with email {email} already exists")
        
        user = User.objects.create(
            first_name=member_data.get('first_name', '').strip(),
            last_name=member_data.get('last_name', '').strip(),
            email=email,
            username=email,  # Use email as username
            gender=member_data.get('gender'),
            phone_number=member_data.get('phone_number', '').strip(),
            id_number=member_data.get('id_number', '').strip(),
            address=member_data.get('address', '').strip(),
            town=member_data.get('town', '').strip(),
            country=member_data.get('country', '').strip(),
            password=make_password('TempPassword123!')  # Use proper password hashing
        )
        
        return user
    
    def _filter_by_main_member(
        self, 
        records: List[Dict[str, Any]], 
        member_id_number: str
    ) -> List[Dict[str, Any]]:
        """Filter records by main member ID number (case-insensitive)"""
        if not member_id_number:
            return []
            
        return [
            record for record in records
            if record.get('main_member_id_number', '').strip().lower() == 
               member_id_number.strip().lower()
        ]
    
    def _create_dependents(
        self, 
        membership: Membership, 
        dependents: List[Dict[str, Any]]
    ) -> None:
        """Create dependents and update membership totals"""
        if not dependents:
            return
            
        dependent_objects = []
        total_dependent_premium = Decimal('0')
        total_dependent_cover = Decimal('0')
        
        for dependent_data in dependents:
            premium = Decimal(str(dependent_data.get('premium', 0)))
            cover_amount = Decimal(str(dependent_data.get('cover_amount', 0)))
            
            dependent = Dependent(
                membership=membership,
                policy=membership.policy,
                scheme_group=membership.scheme_group,
                first_name=dependent_data.get('first_name', '').strip(),
                last_name=dependent_data.get('last_name', '').strip(),
                email=dependent_data.get('email', '').strip(),
                id_number=dependent_data.get('id_number', '').strip(),
                passport_number=dependent_data.get('passport_number', '').strip(),
                gender=dependent_data.get('gender'),
                relationship=dependent_data.get('relationship'),
                premium=premium,
                cover_amount=cover_amount,
                date_of_birth=dependent_data.get('date_of_birth'),
                status='Active',
                dependent_type='Dependent'
            )
            
            dependent_objects.append(dependent)
            total_dependent_premium += premium
            total_dependent_cover += cover_amount
        
        # Bulk create dependents
        Dependent.objects.bulk_create(dependent_objects)
        
        # Update membership totals
        membership.dependent_premium += total_dependent_premium
        membership.dependent_cover_amount += total_dependent_cover
        membership.total_premium += total_dependent_premium
        membership.total_cover_amount += total_dependent_cover
        membership.save(update_fields=[
            'dependent_premium', 
            'dependent_cover_amount', 
            'total_premium', 
            'total_cover_amount'
        ])
    
    def _create_beneficiaries(
        self, 
        membership: Membership, 
        beneficiaries: List[Dict[str, Any]]
    ) -> None:
        """Create beneficiaries in bulk"""
        if not beneficiaries:
            return
            
        beneficiary_objects = [
            Beneficiary(
                membership=membership,
                policy=membership.policy,
                scheme_group=membership.scheme_group,
                first_name=beneficiary_data.get('first_name', '').strip(),
                last_name=beneficiary_data.get('last_name', '').strip(),
                email=beneficiary_data.get('email', '').strip(),
                id_number=beneficiary_data.get('id_number', '').strip(),
                passport_number=beneficiary_data.get('passport_number', '').strip(),
                gender=beneficiary_data.get('gender'),
                relationship=beneficiary_data.get('relationship'),
                percentage=beneficiary_data.get('percentage'),
                date_of_birth=beneficiary_data.get('date_of_birth'),
                status='Active'
            )
            for beneficiary_data in beneficiaries
        ]
        
        Beneficiary.objects.bulk_create(beneficiary_objects)
    
    def _create_premium(self, membership: Membership, amount: Decimal) -> None:
        """Create premium record"""
        Premium.objects.create(
            policy=membership.policy,
            scheme_group=membership.scheme_group,
            membership=membership,
            expected_amount=amount,
            balance=amount,
            expected_date=membership.policy.start_date
        )
    
    def _create_payer_details(
        self, 
        payment_details: Dict[str, Any], 
        policy: Policy, 
        scheme_group: SchemeGroup
    ) -> None:
        """Create payer details if provided"""
        if not payment_details:
            logger.warning(f"No payment details provided for policy {policy.policy_number}")
            return
            
        PayerDetail.objects.create(
            policy=policy,
            scheme_group=scheme_group,
            bank_name=payment_details.get('bank_name', '').strip(),
            account_type=payment_details.get('account_type', '').strip(),
            account_name=payment_details.get('account_name', '').strip(),
            account_number=payment_details.get('account_number', '').strip(),
            branch_code=payment_details.get('branch_code', '').strip(),
            debit_order_date=payment_details.get('debit_order_date'),
            source_of_funds=payment_details.get('source_of_funds', '').strip()
        )


# Usage example:
# service = GroupPolicyPurchaseService(data)
# policy, scheme_group = service.execute()