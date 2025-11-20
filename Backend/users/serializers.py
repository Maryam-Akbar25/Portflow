from rest_framework import serializers
from .models import Role, User, Dashboard

class RoleSerializer(serializers.ModelSerializer):
    roleName = serializers.CharField(max_length=100, required=True, allow_blank=False)
    
    class Meta:
        model = Role
        fields = "__all__"
        read_only_fields = ('roleId', 'createdAt', 'updatedAt', 'deletedAt')
    
    def validate_roleName(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Role name cannot be empty.")
        return value.strip()

class UserSerializer(serializers.ModelSerializer):
    roleName = serializers.CharField(source="role.roleName", read_only=True)
    class Meta:
        model = User
        fields = "__all__"
        read_only_fields = ('userId', 'createdAt', 'updatedAt', 'deletedAt')

class DashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dashboard
        fields = "__all__"