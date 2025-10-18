from django.db import models
from ships.models import Ship
from ports.models import Berth

class Schedule(models.Model):
    scheduleId = models.BigAutoField(primary_key=True)
    ship = models.ForeignKey(Ship, on_delete=models.CASCADE, related_name="schedules")
    berth = models.ForeignKey(Berth, on_delete=models.SET_NULL, null=True, blank=True, related_name="schedules")
    destinationPort = models.CharField(max_length=200, blank=True)
    ETA = models.DateTimeField(null=True, blank=True)
    ATA = models.DateTimeField(null=True, blank=True)
    ETD = models.DateTimeField(null=True, blank=True)
    ATD = models.DateTimeField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=["ship", "ETA", "ETD"]),
            models.Index(fields=["berth", "ETA", "ETD"]),
        ]
        ordering = ["ETA"]

    def __str__(self):
        return f"Schedule {self.scheduleId} - {self.ship.shipName}"

class BerthAssignment(models.Model):
    STATUS_CHOICES = [
        ("assigned", "Assigned"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    assignmentId = models.BigAutoField(primary_key=True)
    ship = models.ForeignKey(Ship, on_delete=models.CASCADE, related_name="assignments", null=True, blank=True)    
    berth = models.ForeignKey(Berth, on_delete=models.CASCADE, related_name="assignments")
    assignedBy = models.CharField(max_length=150, blank=True)  # or FK to users.User if you prefer
    ETA = models.DateTimeField(null=True, blank=True)
    ATA = models.DateTimeField(null=True, blank=True)
    ETD = models.DateTimeField(null=True, blank=True)
    ATD = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="assigned")
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=["berth", "ETA", "ETD"]),
            models.Index(fields=["ship", "status"]),
        ]
        ordering = ["ETA"]

    def __str__(self):
        return f"{self.ship.shipName} → {self.berth.berthName} [{self.status}]"