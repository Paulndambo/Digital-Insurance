from django.contrib import admin

from apps.schemes.models import Scheme, SchemeGroup
# Register your models here.
@admin.register(Scheme)
class SchemeAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "scheme_type", "max_members", "created_at"]
    
    

@admin.register(SchemeGroup)
class SchemeGroupAdmin(admin.ModelAdmin):
    list_display = ["id", "policy", "scheme", "created_at"]
