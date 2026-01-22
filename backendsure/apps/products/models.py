from django.db import models

from apps.core.models import AbstractBaseModel
# Create your models here.
class Product(AbstractBaseModel):
    name = models.CharField(max_length=255)
    scheme = models.ForeignKey("schemes.Scheme", on_delete=models.CASCADE, related_name="products")
    description = models.TextField(null=True)
    policy_number_prefix = models.CharField(max_length=255, null=True)
    
    def __str__(self):
        return f"{self.name} ({self.scheme.name})"
    
    def next_policy_number(self):
        policies_count = self.policies.count() + 1
        return f"{self.policy_number_prefix}_{policies_count}"
    
    
class ProductBenefit(AbstractBaseModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    benefit = models.CharField(max_length=255)
    benefit = models.CharField(max_length=255, choices=(("Key Benefit", "Key Benefit"), ("Added Benefit", "Added Benefit")), default="Key Benefit")
    
    def __str__(self):
        return self.product.name
    