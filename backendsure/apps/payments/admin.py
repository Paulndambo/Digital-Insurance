from django.contrib import admin

from apps.payments.models import Premium, PayerDetail
# Register your models here.
@admin.register(Premium)
class PremiumAdmin(admin.ModelAdmin):
    list_display = ["id", "membership", "scheme_group", "policy", "expected_amount", "due_date", "status"]
    

@admin.register(PayerDetail)
class PayerDetailAdmin(admin.ModelAdmin):
    list_display = ["id", "membership", "account_name", "account_type", "account_number"]
