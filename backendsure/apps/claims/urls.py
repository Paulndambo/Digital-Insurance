from django.urls import path

from apps.claims.views import (
    ClaimAPIView, ClaimDetailAPIView,
    ClaimDocumentAPIView
)

urlpatterns = [
    path("", ClaimAPIView.as_view(), name="claims"),
    path("<int:pk>/details/", ClaimDetailAPIView.as_view(), name="claim-details"),
    path("claim-documents/", ClaimDocumentAPIView.as_view(), name="claim-documents"),
]