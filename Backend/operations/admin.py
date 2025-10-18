from django.contrib import admin
from .models import Schedule, BerthAssignment

@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ("scheduleId", "ship", "berth", "ETA", "ETD")
    list_filter = ("berth", "ship")
    search_fields = ("ship__shipName", "berth__berthName")

@admin.register(BerthAssignment)
class BerthAssignmentAdmin(admin.ModelAdmin):
    list_display = ("assignmentId", "ship", "berth", "status", "ETA", "ETD", "assignedBy")
    list_filter = ("status", "berth", "ship")
    search_fields = ("ship__shipName", "berth__berthName", "assignedBy")