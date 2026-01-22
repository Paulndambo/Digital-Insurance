from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


from apps.claims.models import Claim, ClaimDocument
from apps.claims.serializers import ClaimSerializer, ClaimDetailSerializer, ClaimDocumentSerializer
# Create your views here.
class ClaimAPIView(generics.ListCreateAPIView):
    serializer_class = ClaimSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Claim.objects.all().order_by("-created_at")
        user = self.request.user

        if user.role != "Admin":
            queryset = queryset.filter(policy__policy_owner=user)

        return queryset


class ClaimDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Claim.objects.all().order_by("-created_at")
    serializer_class  = ClaimDetailSerializer

    lookup_field = "pk"



class ClaimDocumentAPIView(generics.CreateAPIView):
    queryset = ClaimDocument.objects.all()
    serializer_class = ClaimDocumentSerializer
