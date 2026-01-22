from django.contrib import admin

from apps.users.models import User, Membership, MembershipStatusUpdate

# Register your models here.
@admin.register(User)
class UsersAdmin(admin.ModelAdmin):
    list_display = ["id", "username", "email", "phone_number", "gender", "role", "created_at"]
    
@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "main_member_premium", "total_cover_amount", "total_premium", "created_at"]

@admin.register(MembershipStatusUpdate)
class MembershipStatusUpdateAdmin(admin.ModelAdmin):
    list_display = ["id", "membership", "previous_status", "next_status", "created_at"]