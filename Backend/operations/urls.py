from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ScheduleViewSet, BerthAssignmentViewSet

router = DefaultRouter()
router.register(r'schedules', ScheduleViewSet)
router.register(r'assignments', BerthAssignmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]