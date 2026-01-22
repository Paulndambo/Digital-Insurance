from django.contrib import admin
from apps.products.models import Product

# Register your models here.
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "scheme", "policy_number_prefix", "next_policy_number", "created_at"]