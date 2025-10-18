from rest_framework import viewsets
from .models import Schedule, BerthAssignment
from .serializers import ScheduleSerializer, BerthAssignmentSerializer

class ScheduleViewSet(viewsets.ModelViewSet):
    queryset = Schedule.objects.select_related("ship", "berth").all()
    serializer_class = ScheduleSerializer

class BerthAssignmentViewSet(viewsets.ModelViewSet):
    queryset = BerthAssignment.objects.select_related("ship", "berth").all()
    serializer_class = BerthAssignmentSerializer