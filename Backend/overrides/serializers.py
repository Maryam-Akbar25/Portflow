from rest_framework import serializers
from .models import ManualOverrideLogs

class ManualOverrideLogsSerializer(serializers.ModelSerializer):
    userName = serializers.CharField(source="user.username", read_only=True)
    shipName = serializers.CharField(source="ship.shipName", read_only=True)
    berthName = serializers.CharField(source="berth.berthName", read_only=True)

    class Meta:
        model = ManualOverrideLogs
        fields = "__all__"