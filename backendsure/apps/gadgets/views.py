from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


from apps.gadgets.models import (
    InsuredGadget, DeviceOutlet
)
from apps.pricing.models import (
    GadgetPricing, GadgetPricingComponent
)


from apps.gadgets.serializers import (
    DeviceOutletSerializer, InsuredGadgetSerializer,
    GadgetPricingSerializer, GadgetPricingComponentSerializer
)
# Create your views here.
class DeviceOutletAPIView(generics.ListCreateAPIView):
    queryset = DeviceOutlet.objects.all().order_by("-created_at")
    serializer_class = DeviceOutletSerializer


class DeviceOutletDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DeviceOutlet.objects.all().order_by("-created_at")
    serializer_class = DeviceOutletSerializer

    lookup_field = "pk"


class InsuredGadgetAPIView(generics.ListCreateAPIView):
    queryset = InsuredGadget.objects.all().order_by("-created_at")
    serializer_class = InsuredGadgetSerializer


class InsuredGadgetDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = InsuredGadget.objects.all().order_by("-created_at")
    serializer_class = InsuredGadgetSerializer

    lookup_field = "pk"


class GadgetPricingAPIView(generics.ListCreateAPIView):
    queryset = GadgetPricing.objects.all().order_by("-created_at")
    serializer_class = GadgetPricingSerializer


class GadgetPricingDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GadgetPricing.objects.all().order_by("-created_at")
    serializer_class = GadgetPricingSerializer

    lookup_field = "pk"