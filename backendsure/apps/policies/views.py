from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q



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



class PolicySearchAPIView(generics.ListAPIView):
    serializer_class = PoliciesDetailSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        search = request.query_params.get("search")

        if not search:
            return Response(
                {"detail": "Search parameter is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        search = search.upper()

        queryset = Policy.objects.filter(
            Q(policy_number=search) | Q(policy_owner__id_number=search)
        )

        if not queryset.exists():
            return Response(
                {"detail": "Policies not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
