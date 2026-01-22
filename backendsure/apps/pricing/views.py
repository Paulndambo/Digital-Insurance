from rest_framework import generics

from apps.pricing.models import MainMemberPricing, DependentPricing, ExtendedDependentPricing
from apps.pricing.serializers import (
    MainMemberPricingSerializer,
    DependentPricingSerializer,
    ExtendedDependentPricingSerializer
)

# Create your views here.
class MainMemberPricingAPIView(generics.ListCreateAPIView):
    queryset = MainMemberPricing.objects.all()
    serializer_class = MainMemberPricingSerializer
    
    
class MainMemberPricingDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MainMemberPricing.objects.all()
    serializer_class = MainMemberPricingSerializer
    lookup_field = "pk"
    
    
class DependentPricingAPIView(generics.ListCreateAPIView):
    queryset = DependentPricing.objects.all()
    serializer_class = DependentPricingSerializer
    
    
class DependentPricingDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DependentPricing.objects.all()
    serializer_class = DependentPricingSerializer
    lookup_field = "pk"
    
    

class ExtendedDependentPricingAPIView(generics.ListCreateAPIView):
    queryset = ExtendedDependentPricing.objects.all()
    serializer_class = ExtendedDependentPricingSerializer
    
    
class ExtendedDependentPricingDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ExtendedDependentPricing.objects.all()
    serializer_class = ExtendedDependentPricingSerializer
    lookup_field = "pk"