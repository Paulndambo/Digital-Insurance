from django.contrib import admin

from apps.pricing.models import (
    MainMemberPricing, DependentPricing, ExtendedDependentPricing,
    GadgetPricing, GadgetPricingComponent
)
# Register your models here.
@admin.register(MainMemberPricing)
class MainMemberPricingAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "product", "cover_level", "premium", "min_age", "max_age"]
    
    
@admin.register(DependentPricing)
class DependentPricingAdmin(admin.ModelAdmin):
    list_display = ["id", "product", "dependent_type", "cover_level", "premium", "min_age", "max_age"]


@admin.register(ExtendedDependentPricing)
class ExtendedDependentPricingAdmin(admin.ModelAdmin):
    list_display = ["id", "product", "cover_level", "premium", "min_age", "max_age"]


@admin.register(GadgetPricing)
class GadgetPricingAdmin(admin.ModelAdmin):
    list_display = ["id", "product", "cover_type", "cover_percentage"]


@admin.register(GadgetPricingComponent)
class GadgetPricingComponentAdmin(admin.ModelAdmin):
    list_display = ["id", "pricing", "name"]
    