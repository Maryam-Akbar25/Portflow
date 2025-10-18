from django.contrib import admin
from .models import Ship

@admin.register(Ship)
class ShipAdmin(admin.ModelAdmin):
    list_display = ("shipId", "shipName", "shipType", "MMSI", "draft", "priorityLevel")
    search_fields = ("shipName", "MMSI", "callSign")
    list_filter = ("shipType",)