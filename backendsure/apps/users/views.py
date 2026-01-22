from apps.users.models import User, Membership

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated


from apps.users.serializers import  CustomTokenObtainPairSerializer, RegisterUserSerializer, UserSerializer, MembershipSerializer



class UserAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser,]


class RegisterUserAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            user.set_password(user.password)
            user.is_active = True
            user.save()
            
            return Response(
                {
                    "success": "User account successfully created, Check your email to activate your account"
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class MembershipAPIView(generics.ListCreateAPIView):
    queryset = Membership.objects.all().order_by("-created_at")
    serializer_class = MembershipSerializer
    permission_classes = [IsAuthenticated]