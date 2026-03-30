from django.db import transaction
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from apps.users.models import User

from apps.gadgets.models import (
    InsuredGadget, DeviceOutlet
)
from apps.pricing.models import (
    GadgetPricing, GadgetPricingComponent
)


from apps.gadgets.serializers import (
    DeviceOutletSerializer, InsuredGadgetSerializer,
    GadgetPricingSerializer, GadgetPricingComponentSerializer, DeviceOutletOnboardingSerializer
)
# Create your views here.
class DeviceOutletAPIView(generics.ListCreateAPIView):
    queryset = DeviceOutlet.objects.all().order_by("-created_at")
    serializer_class = DeviceOutletSerializer

    def perform_create(self, serializer):
        user = self.request.user
        owner = user if getattr(user, "is_authenticated", False) else None
        serializer.save(owner=owner)


class DeviceOutletDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DeviceOutlet.objects.all().order_by("-created_at")
    serializer_class = DeviceOutletSerializer

    lookup_field = "pk"


def _nz(value):
    if value is None:
        return None
    t = str(value).strip()
    return t if t else None


class DeviceOutletOnboardingAPIView(generics.GenericAPIView):
    serializer_class = DeviceOutletOnboardingSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        vd = serializer.validated_data
        login_email = vd["_login_email"]
        password = vd["password"]
        owner_details = dict(vd["owner_details"])
        outlet_details = dict(vd["outlet_details"])

        username = login_email.lower().strip()
        if User.objects.filter(username=username).exists():
            return Response(
                {"detail": "An account with this email already exists. Try logging in."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        with transaction.atomic():
            user = User.objects.create_user(
                username=username,
                email=login_email.strip(),
                password=password,
                first_name=owner_details.get("first_name", "") or "",
                last_name=owner_details.get("last_name", "") or "",
                phone_number=_nz(owner_details.get("phone_number")),
                id_number=_nz(owner_details.get("id_number")),
                passport_number=_nz(owner_details.get("passport_number")),
                gender=owner_details.get("gender") or "Male",
                address=_nz(owner_details.get("address")),
                town=_nz(owner_details.get("town")),
                county=_nz(owner_details.get("county")),
                country=_nz(owner_details.get("country")) or "Kenya",
                role="Sales Agent",
                occupation="Sales Agent",
            )

            device_outlet = DeviceOutlet.objects.create(
                owner=user,
                agent_type=outlet_details.get("agent_type"),
                outlet_number=_nz(outlet_details.get("outlet_number")),
                name=outlet_details.get("name"),
                email=outlet_details.get("email"),
                phone_number=outlet_details.get("phone_number"),
                website=outlet_details.get("website"),
                business_registration_number=_nz(
                    outlet_details.get("business_registration_number")
                ),
                tax_identification_number=_nz(outlet_details.get("tax_identification_number")),
                location=outlet_details.get("location"),
                city=outlet_details.get("city"),
                country=outlet_details.get("country") or "Kenya",
            )

        return Response(
            {
                "message": "Device outlet onboarded successfully",
                "outlet": {
                    "id": device_outlet.id,
                    "name": device_outlet.name,
                    "outlet_number": device_outlet.outlet_number,
                },
                "login_email": login_email.strip(),
            },
            status=status.HTTP_201_CREATED,
        )


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