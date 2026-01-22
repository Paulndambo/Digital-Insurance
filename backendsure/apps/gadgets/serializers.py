from rest_framework import serializers
from apps.gadgets.models import InsuredGadget, DeviceOutlet
from apps.pricing.models import GadgetPricing, GadgetPricingComponent


class DeviceOutletSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeviceOutlet
        fields = "__all__"


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