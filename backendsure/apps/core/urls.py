from django.urls import path
from apps.core.views import PlatformMetricsAPIView

urlpatterns = [
    path("metrics/", PlatformMetricsAPIView.as_view(), name="metrics")
]