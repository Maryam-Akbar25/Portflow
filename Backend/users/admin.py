from django.contrib import admin
from .models import Role, User, Dashboard

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ("roleId", "roleName", "isDeleted", "createdAt")
    search_fields = ("roleName",)

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("userId", "username", "email", "role", "isDeleted", "createdAt")
    search_fields = ("username", "email")
    list_filter = ("role", "isDeleted")

@admin.register(Dashboard)
class DashboardAdmin(admin.ModelAdmin):
    list_display = ("dashboardId", "user", "createdAt", "updatedAt")
    search_fields = ("user__username",)