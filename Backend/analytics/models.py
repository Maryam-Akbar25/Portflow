from django.db import models
from ships.models import Ship
from ports.models import Berth

class AIEngine(models.Model):
    aiEngineId = models.BigAutoField(primary_key=True)
    modelType = models.CharField(max_length=100)
    trainingData = models.JSONField(default=dict, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.modelType}"

class HistoricalData(models.Model):
    dataId = models.BigAutoField(primary_key=True)
    ship = models.ForeignKey(Ship, on_delete=models.CASCADE, related_name="historical_data")
    berth = models.ForeignKey(Berth, on_delete=models.CASCADE, related_name="historical_data")
    ETA = models.DateTimeField(null=True, blank=True)
    ATA = models.DateTimeField(null=True, blank=True)
    ETD = models.DateTimeField(null=True, blank=True)
    ATD = models.DateTimeField(null=True, blank=True)
    congestionLevel = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    utilizationRate = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [
            models.Index(fields=["ship", "berth", "ETA", "ETD"]),
        ]

    def __str__(self):
        ship_name = self.ship.shipName if self.ship else "No Ship"
        return f"Hist {self.dataId} - {ship_name}"