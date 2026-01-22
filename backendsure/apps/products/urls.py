from django.urls import path
from apps.products.views import ProductAPIView, ProductDetailAPIView, ProductBenefitAPIView

urlpatterns = [
    path("", ProductAPIView.as_view(), name="products"),
    path("<int:pk>/", ProductDetailAPIView.as_view(), name="product-detail"),
    path("benefits/", ProductBenefitAPIView.as_view(), name="benefits"),
]
