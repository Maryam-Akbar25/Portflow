from rest_framework import serializers
from .models import AIEngine, HistoricalData

class AIEngineSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIEngine
        fields = "__all__"

class HistoricalDataSerializer(serializers.ModelSerializer):
    shipName = serializers.CharField(source="ship.shipName", read_only=True)
    berthName = serializers.CharField(source="berth.berthName", read_only=True)

    class Meta:
        model = HistoricalData
        fields = "__all__"