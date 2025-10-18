from django.db import models

class Port(models.Model):
    portId = models.BigAutoField(primary_key=True)
    portName = models.CharField(max_length=200, unique=True)
    location = models.CharField(max_length=255, blank=True)
    totalBerths = models.IntegerField(default=0)
    totalShips = models.IntegerField(default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.portName

class Berth(models.Model):
    AVAILABILITY_CHOICES = [
        ("available", "Available"),
        ("occupied", "Occupied"),
        ("maintenance", "Maintenance"),
        ("out_of_order", "Out of Order"),
    ]

    berthId = models.BigAutoField(primary_key=True)
    port = models.ForeignKey(Port, on_delete=models.CASCADE, related_name="berths")
    berthName = models.CharField(max_length=100, default="Berth", blank=True)
    length = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    width = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    maxDraft = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    maxShipCapacity = models.IntegerField(null=True, blank=True)
    availabilityStatus = models.CharField(max_length=20, choices=AVAILABILITY_CHOICES, default="available")
    preferredShipType = models.CharField(max_length=100, blank=True)
    loadingRate = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    craneCount = models.IntegerField(null=True, blank=True)
    craneCapacity = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("port", "berthName")
        indexes = [
            models.Index(fields=["port", "berthName"]),
        ]

    def __str__(self):
        return f"{self.port.portName} - {self.berthName}"