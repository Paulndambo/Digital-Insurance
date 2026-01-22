from decimal import Decimal
from typing import Any, Dict, Tuple
from django.db import transaction
from django.contrib.auth.hashers import make_password

from apps.policies.models import Policy, PolicyStatusUpdate
from apps.products.models import Product
from apps.schemes.models import SchemeGroup
from apps.payments.models import Premium, PayerDetail
from apps.family.models import Dependent, Beneficiary
from apps.users.models import User, Membership, MembershipStatusUpdate


class RetailPolicyPurchaseService:
    """Service class for handling retail policy purchases."""
    
    DEFAULT_PASSWORD = "1234"  # Consider using environment variable
    
    def __init__(self, data: Dict[str, Any]) -> None:
        self.data = data
        self._validate_required_data()
        
    def _validate_required_data(self) -> None:
        """Validate that required data is present."""
        required_fields = ["product", "members", "dependents", "beneficiaries", "payment_details"]
        missing_fields = [field for field in required_fields if field not in self.data]
        
        if missing_fields:
            raise ValueError(f"Missing required fields: {', '.join(missing_fields)}")
            
        if not self.data["members"]:
            raise ValueError("At least one member is required")
        
    @transaction.atomic
    def execute(self) -> Tuple[Policy, Membership]:
        """Execute the policy purchase process."""
        try:
            product = self._get_product()
            policy, scheme_group = self._create_policy_and_scheme_group(product)
            membership = self._create_main_membership(scheme_group)
            
            # Calculate totals
            dependent_totals = self._calculate_dependent_totals()
            total_amounts = self._calculate_total_amounts(membership, dependent_totals)
            
            # Update membership and policy with totals
            self._update_membership_totals(membership, dependent_totals, total_amounts)
            self._update_policy_totals(policy, total_amounts)
            
            # Create related entities
            self._create_dependents(membership)
            self._create_beneficiaries(membership)
            self._create_payer_details(membership)
            self._create_premium_record(membership, total_amounts['total_premium'])
            
            return policy, membership
            
        except Exception as e:
            # Log the error here if you have logging configured
            raise e
    
    def _get_product(self) -> Product:
        """Retrieve and validate product."""
        try:
            return Product.objects.get(id=self.data["product"])
        except Product.DoesNotExist:
            raise ValueError(f"Product with id {self.data['product']} does not exist")
    
    def _create_policy_and_scheme_group(self, product: Product) -> Tuple[Policy, SchemeGroup]:
        """Create policy and associated scheme group."""
        policy = Policy.objects.create(
            product=product,
            start_date=self.data.get("start_date"),
            policy_number=product.next_policy_number(),
            cover_amount=Decimal('0'),  # Initialize with 0, will be updated later
            premium=Decimal('0')  # Initialize with 0, will be updated later
        )
        
        PolicyStatusUpdate.objects.create(policy=policy)
        
        scheme_group = SchemeGroup.objects.create(
            scheme=product.scheme,
            policy=policy
        )
        
        return policy, scheme_group
    
    def _create_main_membership(self, scheme_group: SchemeGroup) -> Membership:
        """Create main member user and membership."""
        main_member_data = self.data["members"][0]
        
        user = self._create_user(main_member_data)
        
        membership = Membership.objects.create(
            user=user,
            policy=scheme_group.policy,
            scheme_group=scheme_group,
            main_member_premium=Decimal(str(main_member_data.get("premium", 0))),
            main_member_cover_amount=Decimal(str(main_member_data.get("cover_amount", 0))),
            dependent_cover_amount=Decimal('0'),
            dependent_premium=Decimal('0'),
            total_cover_amount=Decimal('0'),
            total_premium=Decimal('0')
        )
        
        MembershipStatusUpdate.objects.create(membership=membership)
        
        return membership
    
    def _create_user(self, user_data: Dict[str, Any]) -> User:
        """Create a new user with the provided data."""
        user = User.objects.create(
            first_name=user_data.get("first_name", ""),
            last_name=user_data.get("last_name", ""),
            email=user_data.get("email", ""),
            gender=user_data.get("gender", ""),
            phone_number=user_data.get("phone_number", ""),
            id_number=user_data.get("id_number", ""),
            address=user_data.get("address", ""),
            town=user_data.get("town", ""),
            country=user_data.get("country", ""),
            username=user_data.get("email", ""),
            password=make_password(self.DEFAULT_PASSWORD)
        )
        
        return user
    
    def _calculate_dependent_totals(self) -> Dict[str, Decimal]:
        """Calculate total cover amounts and premiums for dependents."""
        dependents = self.data.get("dependents", [])
        
        total_cover = sum(
            Decimal(str(dependent.get("cover_amount", 0))) 
            for dependent in dependents
        )
        total_premium = sum(
            Decimal(str(dependent.get("premium", 0))) 
            for dependent in dependents
        )
        
        return {
            "cover_amount": total_cover,
            "premium": total_premium
        }
    
    def _calculate_total_amounts(self, membership: Membership, dependent_totals: Dict[str, Decimal]) -> Dict[str, Decimal]:
        """Calculate total amounts for the entire policy."""
        total_cover = membership.main_member_cover_amount + dependent_totals["cover_amount"]
        total_premium = membership.main_member_premium + dependent_totals["premium"]
        
        return {
            "total_cover": total_cover,
            "total_premium": total_premium
        }
    
    def _update_membership_totals(self, membership: Membership, dependent_totals: Dict[str, Decimal], total_amounts: Dict[str, Decimal]) -> None:
        """Update membership with calculated totals."""
        membership.dependent_cover_amount = dependent_totals["cover_amount"]
        membership.dependent_premium = dependent_totals["premium"]
        membership.total_cover_amount = total_amounts["total_cover"]
        membership.total_premium = total_amounts["total_premium"]
        membership.save()
    
    def _update_policy_totals(self, policy: Policy, total_amounts: Dict[str, Decimal]) -> None:
        """Update policy with calculated totals."""
        policy.cover_amount = total_amounts["total_cover"]
        policy.premium = total_amounts["total_premium"]
        policy.save()
    
    def _create_dependents(self, membership: Membership) -> None:
        """Create dependent records."""
        dependents_data = self.data.get("dependents", [])
        
        dependent_objects = [
            Dependent(
                membership=membership,
                policy=membership.policy,
                scheme_group=membership.scheme_group,
                first_name=dependent.get("first_name", ""),
                last_name=dependent.get("last_name", ""),
                email=dependent.get("email", ""),
                id_number=dependent.get("id_number", ""),
                passport_number=dependent.get("passport_number", ""),
                gender=dependent.get("gender", ""),
                relationship=dependent.get("relationship", ""),
                premium=Decimal(str(dependent.get("premium", 0))),
                cover_amount=Decimal(str(dependent.get("cover_amount", 0))),
                date_of_birth=dependent.get("date_of_birth"),
                status="Active",
                dependent_type="Dependent"
            )
            for dependent in dependents_data
        ]
        
        if dependent_objects:
            Dependent.objects.bulk_create(dependent_objects)
    
    def _create_beneficiaries(self, membership: Membership) -> None:
        """Create beneficiary records."""
        beneficiaries_data = self.data.get("beneficiaries", [])
        
        beneficiary_objects = [
            Beneficiary(
                membership=membership,
                policy=membership.policy,
                scheme_group=membership.scheme_group,
                first_name=beneficiary.get("first_name", ""),
                last_name=beneficiary.get("last_name", ""),
                email=beneficiary.get("email", ""),
                id_number=beneficiary.get("id_number", ""),
                passport_number=beneficiary.get("passport_number", ""),
                gender=beneficiary.get("gender", ""),
                relationship=beneficiary.get("relationship", ""),
                percentage=Decimal(str(beneficiary.get("percentage", 0))),
                date_of_birth=beneficiary.get("date_of_birth"),
                status="Active"
            )
            for beneficiary in beneficiaries_data
        ]
        
        if beneficiary_objects:
            Beneficiary.objects.bulk_create(beneficiary_objects)
    
    def _create_payer_details(self, membership: Membership) -> None:
        """Create payer details record."""
        payment_details = self.data.get("payment_details", {})
        
        PayerDetail.objects.create(
            membership=membership,
            bank_name=payment_details.get("bank_name", ""),
            account_type=payment_details.get("account_type", ""),
            account_name=payment_details.get("account_name", ""),
            account_number=payment_details.get("account_number", ""),
            branch_code=payment_details.get("branch_code", ""),
            debit_order_date=payment_details.get("debit_order_date"),
            source_of_funds=payment_details.get("source_of_funds", "")
        )
    
    def _create_premium_record(self, membership: Membership, amount: Decimal) -> None:
        """Create premium record."""
        Premium.objects.create(
            policy=membership.policy,
            scheme_group=membership.scheme_group,
            membership=membership,
            expected_amount=amount,
            balance=amount,
            expected_date=membership.policy.start_date
        )