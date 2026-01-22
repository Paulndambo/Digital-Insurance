from django.urls import path
from apps.policies.views import (
    PolicyAPIView, PolicyDetailAPIView,
    PolicySearchAPIView
)

urlpatterns = [
    path("", PolicyAPIView.as_view(), name="policies"),
    path("<int:pk>/details/", PolicyDetailAPIView.as_view(), name="policy-details"),
    path("policies-search/", PolicySearchAPIView.as_view(), name="policies-search")
]