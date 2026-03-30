from django.db import models
from apps.core.models import AbstractBaseModel
# Create your models here.
NOTIFICATION_CATEGORIES = (
    ("Premium Paid", "Premium Paid"),
    ("Policy Cancelled", "Policy Cancelled"),
    ("Policy Expiring Soon", "Policy Expiring Soon"),
    ("New Policy", "New Policy"),
    ("Claim Approved", "Claim Approved"),
    ("Claim Rejected", "Claim Rejected"),
    ("Payment Reminder", "Payment Reminder"),
    ("Policy Lapsed", "Policy Lapsed"),
)

NOTIFICATION_CHANNELS = (
    ("Email", "Email"),
    ("SMS", "SMS"),
    ("WhatsApp", "WhatsApp"),
    ("Push Notification", "Push Notification"),
    ("All Channels", "All Channels"),
)

NOTIFICATION_STATUS = (
    ("Sent", "Sent"),
    ("Failed", "Failed"),
    ("Pending", "Pending"),
    ("Read", "Read"),
)

class NotificationStorage(AbstractBaseModel):
    title = models.CharField(max_length=255)
    policy = models.ForeignKey('policies.Policy', on_delete=models.CASCADE, related_name='notification_storage')
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, null=True, related_name='notification_storage')
    notification_category = models.CharField(max_length=255, choices=NOTIFICATION_CATEGORIES)
    notification_channel = models.CharField(max_length=255, choices=NOTIFICATION_CHANNELS)
    status = models.CharField(max_length=255, choices=NOTIFICATION_STATUS)

    def __str__(self):
        return f"{self.title} - {self.notification_category}"
    

class NotificationLog(AbstractBaseModel):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='notification_logs', null=True)
    notification = models.ForeignKey(NotificationStorage, on_delete=models.CASCADE, related_name='notification_logs')
    sent_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=255, choices=NOTIFICATION_STATUS)


    def __str__(self):
        return f"{self.notification.title} - {self.status} - {self.sent_at}"