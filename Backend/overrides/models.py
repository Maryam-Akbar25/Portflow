from django.db import models
from users.models import User
from ships.models import Ship
from ports.models import Berth

class ManualOverrideLogs(models.Model):
    logId = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="override_logs")
    berth = models.ForeignKey(Berth, on_delete=models.CASCADE, related_name="override_logs")
    ship = models.ForeignKey(Ship, on_delete=models.CASCADE, related_name="override_logs")
    overrideReason = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Override by {self.user.username} on {self.timestamp:%Y-%m-%d %H:%M}"