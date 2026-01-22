from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


from apps.policies.models import Policy, PolicyStatusUpdate
from apps.policies.serializers import PoliciesSerializer, PoliciesDetailSerializer

# Create your views here.
class PolicyAPIView(generics.ListCreateAPIView):
    serializer_class = PoliciesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Policy.objects.all().order_by("-created_at")
        user = self.request.user

        if user.role != "Admin":
            queryset = queryset.filter(policy_owner=user)

        return queryset



class PolicyDetailAPIView(generics.RetrieveAPIView):
    queryset = Policy.objects.all().order_by("-created_at")
    serializer_class = PoliciesDetailSerializer

    lookup_field = "pk"