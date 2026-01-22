from django.db import models
from decimal import Decimal
from typing import Any
from apps.core.models import AbstractBaseModel
from apps.core.constants import PaymentStatuses
# Create your models here.
class Premium(AbstractBaseModel):
    policy = models.ForeignKey("policies.Policy", on_delete=models.CASCADE, related_name="policypremiums")
    membership = models.ForeignKey("users.Membership", on_delete=models.CASCADE)
    scheme_group = models.ForeignKey("schemes.SchemeGroup", on_delete=models.SET_NULL, null=True)
    expected_amount = models.DecimalField(max_digits=12, decimal_places=2)
    
    due_date = models.DateField(null=True)
    status = models.CharField(
        max_length=32,
        choices=PaymentStatuses.choices(),
        default=PaymentStatuses.FUTURE.value
    )

    def __str__(self):
        return f"Premium {self.id} – {self.policy.policy_number}"
    
    @property
    def balance(self):
        allocated = self.allocations.aggregate(
            total=models.Sum("allocated_amount")
        )["total"] or Decimal("0")

        return self.expected_amount - allocated



class Payment(AbstractBaseModel):
    membership = models.ForeignKey("users.Membership", on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    payment_method = models.CharField(max_length=64)
    reference = models.CharField(max_length=255, unique=True)
    payment_details = models.JSONField(null=True, blank=True)

    status = models.CharField(
        max_length=32,
        choices=PaymentStatuses.choices(),
        default=PaymentStatuses.PENDING.value
    )

    def __str__(self):
        return f"Payment {self.reference}"
    

class PremiumPaymentAllocation(AbstractBaseModel):
    premium = models.ForeignKey(Premium, on_delete=models.CASCADE, related_name="allocations")
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name="allocations")
    allocated_amount = models.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        unique_together = ("premium", "payment")



class PayerDetail(AbstractBaseModel):
    policy = models.ForeignKey("policies.Policy", on_delete=models.SET_NULL, null=True, related_name="payer_details")
    scheme_group = models.ForeignKey("schemes.SchemeGroup", on_delete=models.SET_NULL, null=True)
    membership = models.ForeignKey("users.Membership", on_delete=models.SET_NULL, related_name="paymentdetails", null=True)
    bank_name = models.CharField(max_length=255, null=True)
    account_type = models.CharField(max_length=255, null=True)
    account_name = models.CharField(max_length=255, null=True)
    account_number = models.CharField(max_length=255, null=True)
    branch_code = models.CharField(max_length=255, null=True)
    debit_order_date = models.CharField(max_length=255, null=True)
    source_of_funds = models.CharField(max_length=255, null=True)
    payment_method = models.CharField(max_length=255, null=True)
    
    def __str__(self) -> Any:
        return self.account_name
    