from rest_framework import viewsets
from .models import AIEngine, HistoricalData
from .serializers import AIEngineSerializer, HistoricalDataSerializer
from django.http import JsonResponse
from ships.models import Ship
from ports.models import Berth
from overrides.models import ManualOverrideLogs
from operations.models import BerthAssignment

class AIEngineViewSet(viewsets.ModelViewSet):
    queryset = AIEngine.objects.all()
    serializer_class = AIEngineSerializer

class HistoricalDataViewSet(viewsets.ModelViewSet):
    queryset = HistoricalData.objects.select_related("ship", "berth").all()
    serializer_class = HistoricalDataSerializer

def dashboard_summary(_request):
    return JsonResponse({
        "totalShips": Ship.objects.count(),
        "occupiedBerths": Berth.objects.filter(availabilityStatus="occupied").count(),
        "manualOverrides": ManualOverrideLogs.objects.count(),
        "aiAssignmentsMade": BerthAssignment.objects.filter(assignedBy__iexact="AI").count(),

    })