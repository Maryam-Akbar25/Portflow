from django.contrib import admin
from .models import ManualOverrideLogs

@admin.register(ManualOverrideLogs)
class ManualOverrideLogsAdmin(admin.ModelAdmin):
    list_display = ("logId", "user", "ship", "berth", "timestamp")
    list_filter = ("user", "ship", "berth")
    search_fields = ("user__username", "ship__shipName", "berth__berthName")