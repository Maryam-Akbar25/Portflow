from django.contrib import admin
from .models import Port, Berth

@admin.register(Port)
class PortAdmin(admin.ModelAdmin):
    list_display = ("portId", "portName", "location", "totalBerths", "totalShips")
    search_fields = ("portName", "location")

@admin.register(Berth)
class BerthAdmin(admin.ModelAdmin):
    list_display = ("berthId", "berthName", "port", "availabilityStatus", "length", "maxDraft")
    list_filter = ("port", "availabilityStatus")
    search_fields = ("berthName", "port__portName")