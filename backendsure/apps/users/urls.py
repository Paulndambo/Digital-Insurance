from django.urls import path
from apps.users.views import (
    UserAPIView, RegisterUserAPIView, CustomTokenObtainPairView, MembershipAPIView, UserActivationAPIView)

urlpatterns = [
    path("", UserAPIView.as_view(), name="users"),
    path("register/", RegisterUserAPIView.as_view(), name="register"),
    path("login/", CustomTokenObtainPairView.as_view(), name="login"),
    path("activate/", UserActivationAPIView.as_view(), name="activate-account"),
    path("memberships/", MembershipAPIView.as_view(), name="memberships"),
]
