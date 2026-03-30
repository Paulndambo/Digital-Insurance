from decimal import Decimal, ROUND_HALF_UP
from typing import Any, Dict, List, Tuple
import uuid

from apps.pricing.models import GadgetPricing
from django.db import transaction
from django.contrib.auth.hashers import make_password

from apps.policies.models import Policy, PolicyStatusUpdate
from apps.products.models import Product
from apps.schemes.models import SchemeGroup
from apps.payments.models import Premium, PayerDetail
from apps.gadgets.models import InsuredGadget
from apps.family.models import Beneficiary
from apps.users.models import User, Membership, MembershipStatusUpdate
from apps.notifications.models import NotificationStorage


class GadgetPolicyPurchaseService:
    """Service class for handling retail policy purchases."""
    
    DEFAULT_PASSWORD = "1234"  # Consider using environment variable
    
    def __init__(self, data: Dict[str, Any], seller: User) -> None:
        self.data = data
        self.seller = seller
        self._validate_required_data()
        
    def _validate_required_data(self) -> None:
        """Validate that required data is present."""
        required_fields = ["pricing", "start_date", "policy_owner", "payment_details", "devices"]
        missing_fields = [field for field in required_fields if field not in self.data]
        
        if missing_fields:
            raise ValueError(f"Missing required fields: {', '.join(missing_fields)}")
            
        if not self.data["policy_owner"]:
            raise ValueError("At least one member is required")

        devices = self.data.get("devices")
        if not isinstance(devices, list) or len(devices) < 1:
            raise ValueError("devices must be a non-empty list")
        
    @staticmethod
    def line_premium(device_cost: Decimal, cover_percentage: float) -> Decimal:
        """Match JS: Math.round(deviceValue * (cover_percentage / 100))."""
        rate = Decimal(str(cover_percentage)) / Decimal("100")
        raw = device_cost * rate
        return raw.quantize(Decimal("1"), rounding=ROUND_HALF_UP)

    def _totals_per_device(
        self, pricing: GadgetPricing, devices: List[Dict[str, Any]]
    ) -> Tuple[Decimal, Decimal, List[Decimal]]:
        pct = float(pricing.cover_percentage)
        line_premiums: List[Decimal] = []
        total_cover = Decimal("0")
        for d in devices:
            cost = Decimal(str(d.get("device_cost")))
            total_cover += cost
            line_premiums.append(self.line_premium(cost, pct))
        total_premium = sum(line_premiums, start=Decimal("0"))
        return total_premium, total_cover, line_premiums

    @transaction.atomic
    def execute(self) -> Tuple[Policy, Membership]:
        """Execute the policy purchase process."""
        try:
            try:
                pricing = GadgetPricing.objects.select_related("product").get(id=self.data["pricing"])
            except GadgetPricing.DoesNotExist:
                raise ValueError(f"Gadget pricing id {self.data['pricing']} does not exist")
            product = pricing.product
            devices = self.data["devices"]
            total_premium, total_cover, line_premiums = self._totals_per_device(pricing, devices)
            self._computed_premium = total_premium
            self._computed_cover = total_cover
            self._line_premiums = line_premiums

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
                amount=self._computed_premium,
            )
            self._create_insured_devices(membership=membership)
            self._create_beneficiary_if_present(membership=membership)

            self._create_notification(policy=policy)

            return policy, membership
            
        except Exception as e:
            # Log the error here if you have logging configured
            raise e
    
    def _create_policy_and_scheme_group(self, product: Product) -> Tuple[Policy, SchemeGroup]:
        """Create policy and associated scheme group."""
        policy = Policy.objects.create(
            product=product,
            start_date=self.data.get("start_date"),
            policy_number=product.next_policy_number(),
            cover_amount=self._computed_cover,
            premium=self._computed_premium,
            gadget_pricing_id=self.data.get("pricing"),
            purchase_channel=self.__determine_purchase_channel(),
            payment_method=self.data.get("payment_details", {}).get("payment_method", "Mpesa"),
            preferred_communication_channel=self.data.get("additional_information", {}).get("preferred_communication_channel", "Email")
        )
        
        PolicyStatusUpdate.objects.create(policy=policy)
        
        scheme_group = SchemeGroup.objects.create(
            scheme=product.scheme,
            policy=policy
        )
        
        return policy, scheme_group
    
    def __determine_purchase_channel(self) -> str:
        """Determine purchase channel from additional information."""
        additional_info = self.data.get("additional_information", {})
        if additional_info.get("purchase_via_agent", False):
            return "Agent"
        return "Direct"
    
    def _create_main_membership(self, scheme_group: SchemeGroup) -> Membership:
        """Create main member user and membership."""
        main_member_data = self.data["policy_owner"]
        
        user = self._create_user(main_member_data)
        
        membership = Membership.objects.create(
            user=user,
            policy=scheme_group.policy,
            scheme_group=scheme_group,
            main_member_premium=self._computed_premium,
            main_member_cover_amount=self._computed_cover,
            dependent_cover_amount=Decimal('0'),
            dependent_premium=Decimal('0'),
            total_cover_amount=self._computed_cover,
            total_premium=self._computed_premium,
        )
        
        MembershipStatusUpdate.objects.create(membership=membership)

        membership.policy.policy_owner=user
        membership.policy.save()
        
        return membership
    
    def _create_user(self, user_data: Dict[str, Any]) -> User:
        """Create a new user with the provided data."""
        user = User.objects.filter(email=user_data.get("email", "")).first()
        if user:
            return user
        
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
            token=uuid.uuid4(),
        )
        user.is_active = False
        user.password = make_password(self.DEFAULT_PASSWORD)
        user.save()
        
        return user
    
    
    def _create_payer_details(self, membership: Membership) -> None:
        """Create payer details record."""
        payment_details = self.data.get("payment_details", {})
        raw_method = (payment_details.get("payment_method") or "Mpesa").strip()
        method_lower = raw_method.lower()

        if method_lower in ("bank debit", "bank_debit", "bank"):
            method_label = "Bank Debit"
            account_number = payment_details.get("account_number", "") or ""
        elif method_lower in ("card", "card payment", "card payments"):
            method_label = "Card"
            account_number = payment_details.get("account_number", "") or ""
        else:
            method_label = "Mpesa"
            phone = payment_details.get("phone_number", "") or ""
            digits = "".join(c for c in str(phone) if c.isdigit())
            account_number = digits

        PayerDetail.objects.create(
            membership=membership,
            policy=membership.policy,
            scheme_group=membership.scheme_group,
            bank_name=payment_details.get("bank_name", "") or "",
            payment_method=method_label,
            account_type=payment_details.get("account_type", "") or "",
            account_name=payment_details.get("account_name", "") or "",
            phone_number=payment_details.get("phone_number", "") or "",
            account_number=account_number,
            branch_code=payment_details.get("branch_code", "") or "",
            debit_order_date=payment_details.get("debit_order_date"),
            source_of_funds="Private"
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

    def _create_insured_devices(self, membership: Membership) -> None:
        devices = self.data["devices"]
        for device, gadget_premium in zip(devices, self._line_premiums):
            self._create_one_insured_gadget(membership, device, gadget_premium)

    def _create_one_insured_gadget(
        self, membership: Membership, device: Dict[str, Any], gadget_premium: Decimal
    ) -> None:
        desc = (device.get("description") or "").strip()
        wp_years = device.get("warranty_period_years")
        if wp_years is None and device.get("warranty_period") is not None:
            try:
                wp_years = int(device["warranty_period"])
            except (TypeError, ValueError):
                wp_years = None
        wp_end = device.get("warranty_end_date")
        imei_raw = self._clean_str(device.get("imei_number")) or None
        serial_raw = self._clean_str(device.get("serial_number")) or None
        imei_number = imei_raw or serial_raw
        serial_number = serial_raw or imei_raw

        gadget = InsuredGadget.objects.create(
            device_type=device["device_type"],
            device_brand=device["device_brand"],
            device_model=device["device_model"],
            purchase_date=device["purchase_date"],
            device_cost=device["device_cost"],
            description=desc,
            imei_number=imei_number,
            serial_number=serial_number,
            policy=membership.policy,
            membership=membership,
            seller=self.seller,
            pricing_id=self.data["pricing"],
            premium=gadget_premium,
            warranty_period=wp_years,
            warranty_expiry_date=wp_end,
        )
        gadget.calculate_commission(premium=gadget_premium)

    def _create_beneficiary_if_present(self, membership: Membership) -> None:
        raw = self.data.get("beneficiary") or {}
        first = (raw.get("first_name") or "").strip()
        last = (raw.get("last_name") or "").strip()
        if not first and not last:
            return
        relationship = (raw.get("relationship") or "Child").strip()
        gender = (raw.get("gender") or "Other").strip()
        phone = (raw.get("phone_number") or "").strip() or None
        email = (raw.get("email") or "").strip() or None
        Beneficiary.objects.create(
            membership=membership,
            policy=membership.policy,
            scheme_group=membership.scheme_group,
            first_name=first or "—",
            last_name=last or "—",
            email=email,
            phone_number=phone or None,
            id_number="",
            passport_number="",
            gender=gender,
            relationship=relationship,
            percentage=Decimal("100"),
            date_of_birth=None,
        )

    def _create_notification(self, policy: Policy) -> None:
        """Create notification for new policy purchase."""
        for membership in policy.policymemberships.all():
            NotificationStorage.objects.create(
                user=membership.user or None,
                title="Policy Purchase Successful",
                notification_category="New Policy",
                notification_channel=policy.preferred_communication_channel,
                status="Pending",
                policy=policy
            )

    def _clean_str(self, value: Any) -> str:
        """Utility function to clean and normalize string values."""
        if not value:
            return ""
        return str(value).strip()