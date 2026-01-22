from django.db import models
from apps.core.models import AbstractBaseModel
from decimal import Decimal

# Create your models here.
class DeviceOutlet(AbstractBaseModel):
    owner = models.ForeignKey("users.User", on_delete=models.SET_NULL, null=True)
    agent_type = models.CharField(max_length=255, choices=(("Seller", "Seller"), ("Repair", "Repair")))
    outlet_number = models.CharField(max_length=255, null=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(null=True)
    phone_number = models.CharField(max_length=255)
    website = models.URLField(null=True)
    location = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    country = models.CharField(max_length=255, default="Kenya")


    def __str__(self):
        return self.name
    
    def address(self):
        return f"{self.city}, {self.country}"


class InsuredGadget(AbstractBaseModel):
    membership = models.ForeignKey("users.Membership", on_delete=models.CASCADE, related_name="membership_gadgets")
    policy = models.ForeignKey("policies.Policy", on_delete=models.CASCADE, related_name="policy_gadgets")
    device_brand = models.CharField(max_length=255, null=True)
    device_type = models.CharField(max_length=255)
    device_model = models.CharField(max_length=255)
    serial_number = models.CharField(max_length=255, null=True)
    imei_number = models.CharField(max_length=255, null=True)
    device_cost = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0'))
    description = models.TextField()
    purchase_date = models.DateField()
    seller = models.ForeignKey(DeviceOutlet, on_delete=models.SET_NULL, null=True)
    pricing = models.ForeignKey("pricing.GadgetPricing", on_delete=models.CASCADE)
    premium = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0'))
    seller_share = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0'))
    platform_share = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0'))
    insurer_share = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0'))

    def __str__(self) -> str:
        return self.device_type
    

    def calculate_commission(self, premium: Decimal):
        self.seller_share = Decimal(0.1) * Decimal(premium)
        self.platform_share = Decimal(0.2) * Decimal(premium)
        self.insurer_share = Decimal(0.7) * Decimal(premium)
        self.save()