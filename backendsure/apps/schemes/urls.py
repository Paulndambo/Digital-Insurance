from django.urls import path
from apps.schemes.views import SchemeAPIView, SchemeDetailAPIView

urlpatterns = [
    path("", SchemeAPIView.as_view(), name="schemes"),
    path("<int:pk>/", SchemeDetailAPIView.as_view(), name="scheme-detail"),
]
