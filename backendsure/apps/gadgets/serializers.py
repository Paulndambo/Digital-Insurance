from django.core.validators import URLValidator
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers
from apps.gadgets.models import InsuredGadget, DeviceOutlet
from apps.pricing.models import GadgetPricing, GadgetPricingComponent


class DeviceOutletSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeviceOutlet
        fields = "__all__"
        extra_kwargs = {"owner": {"read_only": True}}


class InsuredGadgetSerializer(serializers.ModelSerializer):
    seller = serializers.SerializerMethodField()

    class Meta:
        model = InsuredGadget
        fields = "__all__"

    
    def get_seller(self, obj):
        return obj.seller.name if obj.seller else ""


class GadgetPricingComponentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GadgetPricingComponent
        fields = "__all__"


class GadgetPricingSerializer(serializers.ModelSerializer):
    pricingcomponents = GadgetPricingComponentSerializer(many=True)
    class Meta:
        model = GadgetPricing
        fields = "__all__"



def _optional_str(value):
    if value is None:
        return None
    s = str(value).strip()
    return s if s else None


def _normalize_optional_url(value):
    s = _optional_str(value)
    if not s:
        return None
    if not s.lower().startswith(("http://", "https://")):
        s = f"https://{s}"
    validator = URLValidator()
    try:
        validator(s)
    except DjangoValidationError as exc:
        raise serializers.ValidationError("Enter a valid URL.") from exc
    return s


class OwnerDetailsOnboardingSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    phone_number = serializers.CharField(max_length=255)
    email = serializers.EmailField(required=False, allow_blank=True, allow_null=True)
    id_number = serializers.CharField(
        max_length=255, required=False, allow_blank=True, allow_null=True
    )
    passport_number = serializers.CharField(
        max_length=255, required=False, allow_blank=True, allow_null=True
    )
    gender = serializers.ChoiceField(choices=("Male", "Female"))
    address = serializers.CharField(max_length=255)
    town = serializers.CharField(max_length=255)
    county = serializers.CharField(max_length=255)
    country = serializers.CharField(max_length=255, required=False, default="Kenya")


class OutletDetailsOnboardingSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    location = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    phone_number = serializers.CharField(max_length=255)
    business_registration_number = serializers.CharField(
        max_length=255, required=False, allow_blank=True, allow_null=True
    )
    tax_identification_number = serializers.CharField(
        max_length=255, required=False, allow_blank=True, allow_null=True
    )
    city = serializers.CharField(max_length=255)
    country = serializers.CharField(max_length=255, required=False, default="Kenya")
    agent_type = serializers.ChoiceField(choices=("Seller", "Repair"))
    outlet_number = serializers.CharField(
        max_length=255, required=False, allow_blank=True, allow_null=True
    )
    website = serializers.CharField(
        max_length=500, required=False, allow_blank=True, allow_null=True
    )

    def validate_website(self, value):
        return _normalize_optional_url(value)


class DeviceOutletOnboardingSerializer(serializers.Serializer):
    owner_details = OwnerDetailsOnboardingSerializer()
    outlet_details = OutletDetailsOnboardingSerializer()
    password = serializers.CharField(write_only=True, min_length=8, max_length=128)
    password_confirm = serializers.CharField(write_only=True, max_length=128)

    def validate(self, attrs):
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError(
                {"password_confirm": "Passwords must match."}
            )
        owner = attrs["owner_details"]
        outlet = attrs["outlet_details"]
        login_email = _optional_str(owner.get("email")) or _optional_str(outlet.get("email"))
        if not login_email:
            raise serializers.ValidationError(
                "Provide an email on the owner or on the outlet — it is used to create your login."
            )
        attrs["_login_email"] = login_email
        return attrs