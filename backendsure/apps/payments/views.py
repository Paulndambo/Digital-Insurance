from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


from apps.payments.models import Premium, PayerDetail, Payment
from apps.payments.serializers import (
    PremiumSerializer, PayerDetailSerializer, PaymentSerializer
)
# Create your views here.
class PremiumAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Premium.objects.all().order_by("-created_at")
    serializer_class = PremiumSerializer

class PremiumDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Premium.objects.all().order_by("-created_at")
    serializer_class = PremiumSerializer

    lookup_field = "pk"


class PaymentAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Payment.objects.all().order_by("-created_at")
    serializer_class = PaymentSerializer

class PaymentDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Payment.objects.all().order_by("-created_at")
    serializer_class = PaymentSerializer

    lookup_field = "pk"


class PayerDetailAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = PayerDetail.objects.all().order_by("-created_at")
    serializer_class = PayerDetailSerializer

class PayerDetailDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = PayerDetail.objects.all().order_by("-created_at")
    serializer_class = PayerDetailSerializer

    lookup_field = "pk"
