from django.db import models

class Ship(models.Model):
    shipId = models.BigAutoField(primary_key=True)
    shipName = models.CharField(max_length=200, unique=True)
    MMSI = models.CharField(max_length=15, null=True, blank=True)
    callSign = models.CharField(max_length=20, null=True, blank=True)
    shipType = models.CharField(max_length=100, blank=True)
    length = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    beam = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    draft = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    grossTonnage = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    cargoType = models.CharField(max_length=100, blank=True)
    nationality = models.CharField(max_length=100, blank=True)
    priorityLevel = models.IntegerField(default=1)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.shipName