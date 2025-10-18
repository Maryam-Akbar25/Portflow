from rest_framework import viewsets
from .models import ManualOverrideLogs
from .serializers import ManualOverrideLogsSerializer

class ManualOverrideLogsViewSet(viewsets.ModelViewSet):
    queryset = ManualOverrideLogs.objects.select_related("user", "ship", "berth").all()
    serializer_class = ManualOverrideLogsSerializer