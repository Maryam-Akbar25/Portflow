from django.contrib import admin
from .models import AIEngine, HistoricalData

@admin.register(AIEngine)
class AIEngineAdmin(admin.ModelAdmin):
    list_display = ("aiEngineId", "modelType", "createdAt", "updatedAt")
    search_fields = ("modelType",)

@admin.register(HistoricalData)
class HistoricalDataAdmin(admin.ModelAdmin):
    list_display = ("dataId", "ship", "berth", "ETA", "ETD", "congestionLevel", "utilizationRate")
    list_filter = ("ship", "berth")
    search_fields = ("ship__shipName", "berth__berthName")