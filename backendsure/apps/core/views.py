from django.db.models import Sum, Count
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from apps.policies.models import Policy
from apps.claims.models import Claim
from apps.users.models import Membership
from apps.payments.models import Premium
from apps.gadgets.models import InsuredGadget
from apps.core.constants import PolicyStatuses, ClaimStatuses


class PlatformMetricsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user

        if user.role != "Admin":
            return Response(
                {"detail": "You do not have permission to view platform metrics."},
                status=status.HTTP_403_FORBIDDEN
            )

        metrics = {
            "total_policies": Policy.objects.count(),
            "active_policies": Policy.objects.filter(
                status=PolicyStatuses.ACTIVE.value
            ).count(),

            "total_claims": Claim.objects.count(),
            "pending_claims": Claim.objects.filter(
                status__in=[
                    ClaimStatuses.PENDING.value,
                    ClaimStatuses.PENDING_VERIFICATION.value
                ]
            ).count(),

            "policy_owners": Membership.objects.count(),

            "monthly_total_premium": Premium.objects.aggregate(
                total=Sum("expected_amount")
            )["total"] or 0,

            "total_device_value": InsuredGadget.objects.aggregate(
                total=Sum("device_cost")
            )["total"] or 0,

            "total_amount_claimed": Claim.objects.aggregate(
                total=Sum("estimated_cost")
            )["total"] or 0,
        }

        return Response(metrics, status=status.HTTP_200_OK)
