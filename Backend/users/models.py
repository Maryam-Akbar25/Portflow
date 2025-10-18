from django.db import models

class Role(models.Model):
    roleId = models.BigAutoField(primary_key=True)
    roleName = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    isDeleted = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    deletedAt = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.roleName

class User(models.Model):
    userId = models.BigAutoField(primary_key=True)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    passwordHash = models.CharField(max_length=255)
    role = models.ForeignKey(Role, on_delete=models.PROTECT, related_name="users")
    isDeleted = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    deletedAt = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.username

class Dashboard(models.Model):
    dashboardId = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="dashboards")
    berthOccupancy = models.JSONField(default=dict, blank=True)
    shipSchedules = models.JSONField(default=dict, blank=True)
    congestionAlerts = models.JSONField(default=dict, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Dashboard {self.dashboardId} of {self.user.username}"