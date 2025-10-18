from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ManualOverrideLogsViewSet

router = DefaultRouter()
router.register(r'override-logs', ManualOverrideLogsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]