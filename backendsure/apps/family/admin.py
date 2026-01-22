from django.contrib import admin

from apps.family.models import Dependent, Beneficiary
# Register your models here.
@admin.register(Dependent)
class DependentAdmin(admin.ModelAdmin):
    list_display = ["id", "policy", "membership", "dependent_type", "cover_amount", "premium", "relationship"]
    
    
@admin.register(Beneficiary)
class BeneficiaryAdmin(admin.ModelAdmin):
    list_display = ["id", "policy", "membership", "relationship", "percentage"]
