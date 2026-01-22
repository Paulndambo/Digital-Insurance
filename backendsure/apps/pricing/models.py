from django.db import models
from decimal import Decimal

from apps.core.models import AbstractBaseModel
from apps.core.constants import DependentTypes
# Create your models here.
class MainMemberPricing(AbstractBaseModel):
    name = models.CharField(max_length=255, null=True)
    product = models.ForeignKey("products.Product", on_delete=models.CASCADE, related_name="mainmemberprices")
    cover_level = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    premium = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    min_age = models.IntegerField(default=0)
    max_age = models.IntegerField(default=0)
    
    def __str__(self):
        return self.product.name
    
    
class DependentPricing(AbstractBaseModel):
    product = models.ForeignKey("products.Product", on_delete=models.CASCADE, related_name="dependentprices")
    cover_level = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    premium = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    dependent_type = models.CharField(max_length=255, choices=DependentTypes.choices())
    min_age = models.IntegerField(default=0)
    max_age = models.IntegerField(default=0)
    
    def __str__(self):
        return self.product.name
    
    

class ExtendedDependentPricing(AbstractBaseModel):
    product = models.ForeignKey("products.Product", on_delete=models.CASCADE, related_name="extendeddependentprices")
    cover_level = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    premium = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    min_age = models.IntegerField(default=0)
    max_age = models.IntegerField(default=0)
    
    def __str__(self):
        return self.product.name
    

class GadgetPricing(AbstractBaseModel):
    product = models.ForeignKey("products.Product", on_delete=models.CASCADE)
    cover_type = models.CharField(max_length=255, choices=(("Full Cover", "Full Cover"), ("Partial Cover", "Partial Cover")), default="Partial Cover")
    cover_percentage = models.FloatField(default=1)

    def __str__(self):
        return f"{self.product.name} ({self.cover_type})"


class GadgetPricingComponent(AbstractBaseModel):
    pricing = models.ForeignKey(GadgetPricing, on_delete=models.CASCADE, related_name="pricingcomponents")
    name = models.CharField(max_length=255)
    included = models.BooleanField(default=True)