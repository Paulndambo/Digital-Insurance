from django.urls import path
from apps.policies.views import (
    PolicyAPIView, PolicyDetailAPIView
)

urlpatterns = [
    path("", PolicyAPIView.as_view(), name="policies"),
    path("<int:pk>/details/", PolicyDetailAPIView.as_view(), name="policy-details"),
]