from django.db import models
from decimal import Decimal

from apps.core.models import AbstractBaseModel
# Create your models here.
class Claim(AbstractBaseModel):
    claim_number = models.CharField(max_length=255)
    policy = models.ForeignKey("policies.Policy", on_delete=models.CASCADE, related_name="policy_claims")
    description = models.TextField()
    claim_type = models.CharField(max_length=255)
    estimated_cost = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0'))
    incident_date = models.DateField()
    device_outlet = models.ForeignKey("gadgets.DeviceOutlet", on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=255, default="Pending Verification")
    verified = models.BooleanField(default=False)


    def __str__(self):
        return self.claim_number
    

class ClaimDocument(AbstractBaseModel):
    claim = models.ForeignKey(Claim, on_delete=models.CASCADE, related_name="claim_documents")
    document_name = models.CharField(max_length=255)
    document_file = models.FileField(upload_to="claim_documents/")

    def __str__(self):
        return self.document_name