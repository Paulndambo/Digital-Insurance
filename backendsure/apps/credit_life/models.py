from django.db import models
from decimal import Decimal
from apps.core.models import AbstractBaseModel
# Create your models here.
class Creditor(AbstractBaseModel):
    membership = models.ForeignKey("users.Membership", on_delete=models.CASCADE, related_name="membershipcreditors")
    policy = models.ForeignKey("policies.Policy", on_delete=models.CASCADE, related_name="policycreditors")
    scheme_group = models.ForeignKey("schemes.SchemeGroup", on_delete=models.SET_NULL, null=True, related_name="schemegroupcreditors")
    creditor_name = models.CharField(max_length=255)  
    contact_person_name = models.CharField(max_length=255, null=True) 
    contact_person_email = models.EmailField(null=True) 
    contact_person_phone_number = models.CharField(max_length=255, null=True)
    address = models.CharField(max_length=255, null=True)
    town = models.CharField(max_length=255, null=True)
    country = models.CharField(max_length=255, null=True)
    date_registered = models.DateField(null=True)
    loan_reference = models.CharField(max_length=255, null=True)
    loan_amount = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    outstanding_balance = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    premium = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    term_months = models.IntegerField(default=1)
    declining_term = models.BooleanField(default=True)
    
    def __str__(self):
        return self.creditor_name
