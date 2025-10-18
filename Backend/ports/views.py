from rest_framework import viewsets
from .models import Port, Berth
from .serializers import PortSerializer, BerthSerializer

class PortViewSet(viewsets.ModelViewSet):
    queryset = Port.objects.all()
    serializer_class = PortSerializer

class BerthViewSet(viewsets.ModelViewSet):
    queryset = Berth.objects.all()
    serializer_class = BerthSerializer