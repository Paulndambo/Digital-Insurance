from django.urls import path

from apps.gadgets.views import (
    DeviceOutletAPIView, DeviceOutletDetailAPIView,
    InsuredGadgetAPIView, InsuredGadgetDetailAPIView,
    GadgetPricingAPIView, GadgetPricingDetailAPIView
)

urlpatterns = [
    path("", InsuredGadgetAPIView.as_view(), name="gadgets"),
    path("<int:pk>/details/", InsuredGadgetDetailAPIView.as_view(), name="gadget-details"),
    path("device-outlets/", DeviceOutletAPIView.as_view(), name="device-outlets"),
    path("device-outlets/<int:pk>/details/", DeviceOutletDetailAPIView.as_view(), name="device-outlet-details"),
]