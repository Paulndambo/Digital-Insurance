from django.db import models
from decimal import Decimal

from apps.core.models import AbstractBaseModel
from apps.core.constants import PolicyStatuses
# Create your models here.
class Policy(AbstractBaseModel):
    product = models.ForeignKey("products.Product", on_delete=models.SET_NULL, null=True, related_name="policies")
    policy_number = models.CharField(max_length=255)
    start_date = models.DateField(null=True)
    maturity_date = models.DateField(null=True)
    status = models.CharField(max_length=255, choices=PolicyStatuses.choices(), default=PolicyStatuses.CREATED.value)
    premium = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    cover_amount = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    policy_document = models.FileField(upload_to="policy_documents/", null=True)
    policy_owner = models.ForeignKey("users.User", on_delete=models.SET_NULL, null=True)
    gadget_pricing = models.ForeignKey("pricing.GadgetPricing", on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return self.policy_number    
    
    def policy_owner_name(self):
        return f"{self.policy_owner.first_name} {self.policy_owner.last_name}" if self.policy_owner else "Group Policy"
    

class PolicyStatusUpdate(AbstractBaseModel):
    policy = models.ForeignKey(Policy, on_delete=models.CASCADE, related_name="policy_status_updates")
    previous_status = models.CharField(max_length=255, choices=PolicyStatuses.choices(), default=PolicyStatuses.DRAFT.value)
    next_status = models.CharField(max_length=255, choices=PolicyStatuses.choices(), default=PolicyStatuses.CREATED.value)
    
    def __str__(self):
        return self.policy.policy_number
    
