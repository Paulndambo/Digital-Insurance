from django.contrib import admin

from apps.policies.models import Policy, PolicyStatusUpdate
# Register your models here.
@admin.register(Policy)
class PolicyAdmin(admin.ModelAdmin):
    list_display = ["id", "policy_number", "cover_amount", "premium", "start_date"]
    
    
@admin.register(PolicyStatusUpdate)
class PolicyStatusUpdateAdmin(admin.ModelAdmin):
    list_display = ["id", "policy", "previous_status", "next_status", "created_at"]