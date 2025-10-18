from rest_framework import serializers
from .models import Role, User, Dashboard

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = "__all__"

class UserSerializer(serializers.ModelSerializer):
    roleName = serializers.CharField(source="role.roleName", read_only=True)
    class Meta:
        model = User
        fields = "__all__"

class DashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dashboard
        fields = "__all__"