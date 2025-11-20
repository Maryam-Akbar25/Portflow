from rest_framework import serializers
from .models import Ship

class ShipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ship
        fields = '__all__'
        read_only_fields = ('shipId', 'createdAt', 'updatedAt')