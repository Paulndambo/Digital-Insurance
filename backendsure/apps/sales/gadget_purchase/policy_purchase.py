from typing import Dict, Any

from apps.pricing.models import GadgetPricing


from decimal import Decimal
from typing import Any, Dict, Tuple
from django.db import transaction
from django.contrib.auth.hashers import make_password

from apps.policies.models import Policy, PolicyStatusUpdate
from apps.products.models import Product
from apps.schemes.models import SchemeGroup
from apps.payments.models import Premium, PayerDetail
from apps.gadgets.models import InsuredGadget
from apps.users.models import User, Membership, MembershipStatusUpdate


class GadgetPolicyPurchaseService:
    """Service class for handling retail policy purchases."""
    
    DEFAULT_PASSWORD = "1234"  # Consider using environment variable
    
    def __init__(self, data: Dict[str, Any], seller: User) -> None:
        self.data = data
        self.seller = seller
        self._validate_required_data()
        
    def _validate_required_data(self) -> None:
        """Validate that required data is present."""
        required_fields = ["pricing", "cover_amount", "premium", "start_date", "policy_owner", "payment_details", "devices"]
        missing_fields = [field for field in required_fields if field not in self.data]
        
        if missing_fields:
            raise ValueError(f"Missing required fields: {', '.join(missing_fields)}")
            
        if not self.data["policy_owner"]:
            raise ValueError("At least one member is required")
        
    @transaction.atomic
    def execute(self) -> Tuple[Policy, Membership]:
        """Execute the policy purchase process."""
        try:
            product = self._get_product()
            policy, scheme_group = self._create_policy_and_scheme_group(
                product=product
            )
            membership = self._create_main_membership(
                scheme_group=scheme_group
            )
            
            # Update membership and policy with totals
            # Create related entities
            self._create_payer_details(membership)
            self._create_premium_record(
                membership=membership,
                amount=self.data.get("premium", 0)
            )
            self._create_insured_device(membership=membership)
            
            return policy, membership
            
        except Exception as e:
            # Log the error here if you have logging configured
            raise e
    
    def _get_product(self) -> Product:
        """Retrieve and validate product."""
        try:
            pricing = GadgetPricing.objects.get(id=self.data["pricing"])
            return Product.objects.get(id=pricing.product.id)
        except Product.DoesNotExist:
            raise ValueError(f"Product with id {self.data['pricing']} does not exist")
    
    def _create_policy_and_scheme_group(self, product: Product) -> Tuple[Policy, SchemeGroup]:
        """Create policy and associated scheme group."""
        policy = Policy.objects.create(
            product=product,
            start_date=self.data.get("start_date"),
            policy_number=product.next_policy_number(),
            cover_amount=Decimal(self.data["cover_amount"]),
            premium=Decimal(self.data["premium"]),
            gadget_pricing_id=self.data.get("pricing"),
        )
        
        PolicyStatusUpdate.objects.create(policy=policy)
        
        scheme_group = SchemeGroup.objects.create(
            scheme=product.scheme,
            policy=policy
        )
        
        return policy, scheme_group
    
    def _create_main_membership(self, scheme_group: SchemeGroup) -> Membership:
        """Create main member user and membership."""
        main_member_data = self.data["policy_owner"]
        
        user = self._create_user(main_member_data)
        
        membership = Membership.objects.create(
            user=user,
            policy=scheme_group.policy,
            scheme_group=scheme_group,
            main_member_premium=Decimal(str(self.data.get("premium", 0))),
            main_member_cover_amount=Decimal(str(self.data.get("cover_amount", 0))),
            dependent_cover_amount=Decimal('0'),
            dependent_premium=Decimal('0'),
            total_cover_amount=Decimal(self.data.get("cover_amount", 0)),
            total_premium=Decimal(self.data.get("premium", 0))
        )
        
        MembershipStatusUpdate.objects.create(membership=membership)

        membership.policy.policy_owner=user
        membership.policy.save()
        
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
    
    
    def _create_payer_details(self, membership: Membership) -> None:
        """Create payer details record."""
        payment_details = self.data.get("payment_details", {})
        
        PayerDetail.objects.create(
            membership=membership,
            policy=membership.policy,
            scheme_group=membership.scheme_group,
            bank_name=payment_details.get("bank_name", ""),
            payment_method="Mpesa",
            account_type=payment_details.get("account_type", ""),
            account_name=payment_details.get("account_name", ""),
            account_number=payment_details.get("phone_number", ""),
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
            due_date=membership.policy.start_date
        )

    def _create_insured_device(self, membership: Membership) -> None:
        device = self.data["devices"][0]

        gadget = InsuredGadget.objects.create(
            device_type=device["device_type"],
            device_brand=device["device_brand"],
            device_model=device["device_model"],
            purchase_date=device["purchase_date"],
            device_cost=device["device_cost"],
            description=device["description"],
            imei_number=device.get("imei_number") if device.get("imei_number") else device.get("serial_number"),
            serial_number=device.get("serial_number") if device.get("serial_number") else device.get("imei_number"),
            policy=membership.policy,
            membership=membership,
            seller=self.seller,
            pricing_id=self.data["pricing"],
            premium=self.data.get("premium")
        )
        gadget.calculate_commission(premium=self.data.get("premium", 0))