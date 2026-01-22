from django.contrib import admin


from apps.gadgets.models import DeviceOutlet, InsuredGadget
# Register your models here.
@admin.register(DeviceOutlet)
class DeviceOutletAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "agent_type", "phone_number", "address"]


@admin.register(InsuredGadget)
class InsuredGadgetAdmin(admin.ModelAdmin):
    list_display = ["id", "device_type", "device_model", "device_cost", "purchase_date"]