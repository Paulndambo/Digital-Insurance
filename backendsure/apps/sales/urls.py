from django.urls import path
from apps.sales.views import PolicyPurchaseAPIView
from apps.sales.gadget_purchase.views import GadgetPolicyPurchaseAPIView

urlpatterns = [
    path("policy-purchase/", PolicyPurchaseAPIView.as_view(), name="policy-purchase"),
    path("gadget-policy-purchase/", GadgetPolicyPurchaseAPIView.as_view(), name="gadget-policy-purchase")
]
