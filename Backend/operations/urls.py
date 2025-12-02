from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ScheduleViewSet, BerthAssignmentViewSet, OptimizeAllocationsView, PredictAllocationsView, DownloadPredictionsView

router = DefaultRouter()
router.register(r'schedules', ScheduleViewSet)
router.register(r'assignments', BerthAssignmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('optimize/data/', OptimizeAllocationsView.as_view(), name='optimize-data'),
    path('optimize/predict/', PredictAllocationsView.as_view(), name='optimize-predict'),
    path('optimize/download/', DownloadPredictionsView.as_view(), name='optimize-download'),
]