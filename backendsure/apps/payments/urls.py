from django.urls import path
from apps.payments.views import (
    PremiumAPIView, PremiumDetailAPIView,
    PaymentAPIView, PaymentDetailAPIView,
    PayerDetailAPIView, PayerDetailDetailAPIView
)

urlpatterns = [
    path("", PaymentAPIView.as_view(), name="payments"),
    path("<int:pk>/details/", PaymentDetailAPIView.as_view(), name="payment-details"),
    path("premiums/", PremiumAPIView.as_view(), name="premiums"),
    path("premiums/<int:pk>/details/", PremiumDetailAPIView.as_view(), name="premium-details"),
    path("payers/", PayerDetailAPIView.as_view(), name="payers"),
    path("payers/<int:pk>/details/", PayerDetailDetailAPIView.as_view(), name="payer-details"),
    
    
]