from rest_framework import serializers
from apps.products.models import Product, ProductBenefit
from apps.pricing.serializers import (
    MainMemberPricingSerializer, 
    DependentPricingSerializer, 
    ExtendedDependentPricingSerializer
)


class ProductSerializer(serializers.ModelSerializer):
    mainmemberprices = MainMemberPricingSerializer(many=True)
    dependentprices = DependentPricingSerializer(many=True)
    extendeddependentprices = ExtendedDependentPricingSerializer(many=True)
    class Meta:
        model = Product
        fields = "__all__"
        
        

class ProductBenefitSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductBenefit
        fields = "__all__"
