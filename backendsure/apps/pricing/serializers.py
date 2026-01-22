from rest_framework import serializers
from apps.pricing.models import MainMemberPricing, DependentPricing, ExtendedDependentPricing


               
class MainMemberPricingSerializer(serializers.ModelSerializer):
    class Meta:
        model = MainMemberPricing
        fields = "__all__"
        
        
class DependentPricingSerializer(serializers.ModelSerializer):
    class Meta:
        model = DependentPricing
        fields = "__all__"
        
        
class ExtendedDependentPricingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtendedDependentPricing
        fields = "__all__"