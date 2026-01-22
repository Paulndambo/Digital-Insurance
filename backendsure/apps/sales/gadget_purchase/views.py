from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


from apps.sales.gadget_purchase.serializers import GadgetPolicyPurchaseSerializer
from apps.sales.gadget_purchase.policy_purchase import GadgetPolicyPurchaseService

from apps.gadgets.models import DeviceOutlet

class GadgetPolicyPurchaseAPIView(generics.CreateAPIView):
    serializer_class = GadgetPolicyPurchaseSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid(raise_exception=True):
            seller = DeviceOutlet.objects.filter(
                owner=request.user
            ).first()
            if not seller:
                seller = DeviceOutlet.objects.get(
                    owner__username="admin"
                )
            GadgetPolicyPurchaseService(
                data=serializer.validated_data,
                seller=seller
            ).execute()
            return Response({"success": "Gadget policy purchased successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)