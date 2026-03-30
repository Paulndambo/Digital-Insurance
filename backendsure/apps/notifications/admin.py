from django.contrib import admin

from apps.notifications.models import NotificationStorage, NotificationLog
# Register your models here.
@admin.register(NotificationStorage)
class NotificationStorageAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'policy', 'user', 'notification_category', 'notification_channel', 'status')