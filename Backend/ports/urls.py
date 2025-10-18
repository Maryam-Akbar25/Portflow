from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PortViewSet, BerthViewSet

router = DefaultRouter()
router.register(r'ports', PortViewSet)
router.register(r'berths', BerthViewSet)

urlpatterns = [
    path('', include(router.urls)),
]