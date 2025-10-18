from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AIEngineViewSet, HistoricalDataViewSet, dashboard_summary

router = DefaultRouter()
router.register(r'ai-engines', AIEngineViewSet)
router.register(r'historical-data', HistoricalDataViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('summary/', dashboard_summary),  # add this
]