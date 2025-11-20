from rest_framework import serializers
from .models import Port, Berth

class PortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Port
        fields = "__all__"
        read_only_fields = ('portId', 'createdAt', 'updatedAt')

class BerthSerializer(serializers.ModelSerializer):
    portName = serializers.CharField(source="port.portName", read_only=True)
    class Meta:
        model = Berth
        fields = "__all__"
        read_only_fields = ('berthId', 'createdAt', 'updatedAt')