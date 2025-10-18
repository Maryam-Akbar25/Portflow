from rest_framework import serializers
from .models import Schedule, BerthAssignment

class ScheduleSerializer(serializers.ModelSerializer):
    shipName = serializers.CharField(source="ship.shipName", read_only=True)
    berthName = serializers.CharField(source="berth.berthName", read_only=True)

    class Meta:
        model = Schedule
        fields = "__all__"

class BerthAssignmentSerializer(serializers.ModelSerializer):
    shipName = serializers.CharField(source="ship.shipName", read_only=True)
    berthName = serializers.CharField(source="berth.berthName", read_only=True)

    class Meta:
        model = BerthAssignment
        fields = "__all__"