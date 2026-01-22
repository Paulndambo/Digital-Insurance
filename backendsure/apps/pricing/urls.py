from django.urls import path
from apps.pricing.views import (
    MainMemberPricingAPIView, MainMemberPricingDetailAPIView,
    DependentPricingAPIView, DependentPricingDetailAPIView,
    ExtendedDependentPricingAPIView, ExtendedDependentPricingDetailAPIView
)

from apps.gadgets.views import (
    GadgetPricingAPIView, GadgetPricingDetailAPIView
)

urlpatterns = [
    path("member-pricing/", MainMemberPricingAPIView.as_view(), name="member-pricing"),
    path("member-pricing/<int:pk>/", MainMemberPricingDetailAPIView.as_view(), name="member-pricing-detail"),
    path("dependent-pricing/", DependentPricingAPIView.as_view(), name="dependent-pricing"),
    path("dependent-pricing/<int:pk>/", DependentPricingDetailAPIView.as_view(), name="dependent-pricing-detail"),
    path("extended-dependent-pricing/", ExtendedDependentPricingAPIView.as_view(), name="extended-dependent-pricing"),
    path("extended-dependent-pricing/<int:pk>/", ExtendedDependentPricingDetailAPIView.as_view(), name="extended-dependent-pricing-detail"),
    path("gadget-pricing/", GadgetPricingAPIView.as_view(), name="gadget-pricing"),
    path("gadget-pricing/<int:pk>/details/", GadgetPricingDetailAPIView.as_view(), name="gadget-pricing-details"),    
]
