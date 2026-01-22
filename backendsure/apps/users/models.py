from django.db import models
from decimal import Decimal
from django.db.models.signals import post_delete
from django.dispatch import receiver

from django.contrib.auth.models import AbstractUser
from apps.core.models import AbstractBaseModel
from apps.core.constants import PolicyStatuses
# Create your models here.
class User(AbstractUser, AbstractBaseModel):
    role = models.CharField(max_length=50, choices=(("Policy Owner", "Policy Owner"), ("Sales Agent", "Sales Agent"), ("Broker", "Broker"), ("Admin", "Admin")))
    phone_number = models.CharField(max_length=255, null=True)
    id_number = models.CharField(max_length=255, null=True)
    passport_number = models.CharField(max_length=255, null=True)
    gender = models.CharField(max_length=255, choices=(("Male", "Male"), ("Female", "Female")))
    address = models.CharField(max_length=255, null=True)
    ward = models.CharField(max_length=255, null=True)
    town = models.CharField(max_length=255, null=True)
    county = models.CharField(max_length=255, null=True)
    country = models.CharField(max_length=255, null=True)
    occupation = models.CharField(max_length=255, null=True)
    
    def __str__(self):
        return self.get_full_name() if self.first_name else self.username


class Membership(AbstractBaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    policy = models.ForeignKey("policies.Policy", on_delete=models.CASCADE)
    scheme_group = models.ForeignKey("schemes.SchemeGroup", on_delete=models.CASCADE)
    membership_certificate = models.FileField(upload_to="membership_certificates", null=True)
    dependent_premium = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    main_member_premium = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    total_premium = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    main_member_cover_amount = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    dependent_cover_amount = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    total_cover_amount = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    
    def __str__(self):
        return self.user.username
    
    
class MembershipStatusUpdate(AbstractBaseModel):
    membership = models.ForeignKey(Membership, on_delete=models.CASCADE)
    previous_status = models.CharField(max_length=255, choices=PolicyStatuses.choices(), default=PolicyStatuses.DRAFT.value)
    next_status = models.CharField(max_length=255, choices=PolicyStatuses.choices(), default=PolicyStatuses.CREATED.value)
    
    def __str__(self):
        return f"{self.previous_status} => {self.next_status}"
    
    
@receiver(post_delete, sender=Membership)
def membership_deleted(sender, instance, **kwargs):
    if instance.user:
        instance.user.delete()