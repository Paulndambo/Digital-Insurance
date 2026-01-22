from rest_framework.response import Response
from rest_framework import generics, status


from apps.products.models import Product, ProductBenefit
from apps.products.serializers import ProductSerializer, ProductBenefitSerializer

# Create your views here.
class ProductAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all().order_by("-created_at")
    serializer_class = ProductSerializer
    
    
class ProductDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all().order_by("-created_at")
    serializer_class = ProductSerializer
    
    lookup_field = "pk"
    
    
class ProductBenefitAPIView(generics.ListCreateAPIView):
    queryset = ProductBenefit.objects.all().order_by("-created_at")
    serializer_class = ProductBenefitSerializer