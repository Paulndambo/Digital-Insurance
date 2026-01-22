from django.db import models
from decimal import Decimal
from apps.core.constants import GenderTypes, DependentTypes, PolicyStatuses, RelationshipTypes

from apps.core.models import AbstractBaseModel
# Create your models here.
class Dependent(AbstractBaseModel):
    membership = models.ForeignKey("users.Membership", on_delete=models.CASCADE)
    policy = models.ForeignKey("policies.Policy", on_delete=models.CASCADE)
    scheme_group = models.ForeignKey("schemes.SchemeGroup", on_delete=models.SET_NULL, null=True)  
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(null=True)
    phone_number = models.CharField(max_length=255, null=True)
    id_number = models.CharField(max_length=255, null=True)
    passport_number = models.CharField(max_length=255, null=True)
    gender = models.CharField(max_length=50, choices=GenderTypes.choices())
    relationship = models.CharField(max_length=255, choices=RelationshipTypes.choices())
    premium = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    cover_amount = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    date_of_birth = models.DateField(null=True)
    status = models.CharField(max_length=255, choices=PolicyStatuses.choices(), default=PolicyStatuses.ACTIVE.value)
    dependent_type = models.CharField(max_length=255, choices=(('Dependent', 'Dependent'), ('Extended', 'Extended')))
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Beneficiary(AbstractBaseModel):
    membership = models.ForeignKey("users.Membership", on_delete=models.CASCADE)
    policy = models.ForeignKey("policies.Policy", on_delete=models.CASCADE)
    scheme_group = models.ForeignKey("schemes.SchemeGroup", on_delete=models.SET_NULL, null=True)  
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(null=True)
    phone_number = models.CharField(max_length=255, null=True)
    id_number = models.CharField(max_length=255, null=True)
    passport_number = models.CharField(max_length=255, null=True)
    gender = models.CharField(max_length=50, choices=GenderTypes.choices())
    relationship = models.CharField(max_length=255, choices=RelationshipTypes.choices())
    percentage = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    date_of_birth = models.DateField(null=True)
    status = models.CharField(max_length=255, choices=PolicyStatuses.choices(), default=PolicyStatuses.ACTIVE.value)
    
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    

class InsuredDevice(AbstractBaseModel):
    membership = models.ForeignKey("users.Membership", on_delete=models.CASCADE)
    policy = models.ForeignKey("policies.Policy", on_delete=models.CASCADE)
    scheme_group = models.ForeignKey("schemes.SchemeGroup", on_delete=models.SET_NULL, null=True)
    device_type = models.CharField(max_length=255)
    brand = models.CharField(max_length=255)
    purchase_date = models.DateField()
    value = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    imei_number = models.CharField(max_length=255, null=True)
    serial_number = models.CharField(max_length=255, null=True)
    warranty_end_date = models.DateField(null=True)
    cover_amount = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    premium = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    
    def __str__(self) -> str:
        return self.device_type
    

class InsuredPet(AbstractBaseModel):
    membership = models.ForeignKey("users.Membership", on_delete=models.CASCADE)
    policy = models.ForeignKey("policies.Policy", on_delete=models.CASCADE)
    scheme_group = models.ForeignKey("schemes.SchemeGroup", on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255)
    pet_type = models.CharField(max_length=255)
    breed = models.CharField(max_length=255, null=True)
    gender = models.CharField(max_length=255, null=True)
    date_of_birth = models.DateField(null=True)
    microchip_number = models.CharField(max_length=255, null=True)
    cover_type = models.CharField(max_length=255, null=True)
    neutered = models.BooleanField(default=True)
    vaccinated = models.BooleanField(default=True)
    cover_amount = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    premium = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    
    def __str__(self) -> str:
        return self.name    
    
    
class InsuredVehicle(AbstractBaseModel):
    membership = models.ForeignKey("users.Membership", on_delete=models.CASCADE)
    policy = models.ForeignKey("policies.Policy", on_delete=models.CASCADE)
    scheme_group = models.ForeignKey("schemes.SchemeGroup", on_delete=models.SET_NULL, null=True)
    registration_number = models.CharField(max_length=255)
    make = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    year_of_manufacture = models.IntegerField()
    engine_number = models.CharField(max_length=255, null=True)
    chasis = models.CharField(max_length=255, null=True)
    usage_type = models.CharField(max_length=255, null=True)
    color = models.CharField(max_length=255, null=True)
    vehicle_value = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    cover_type = models.CharField(max_length=255, null=True)
    windscreen_covered = models.BooleanField(default=True)
    political_violence_covered = models.BooleanField(default=True)
    excess_protector = models.BooleanField(default=True)
    cover_amount = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    premium = models.DecimalField(max_digits=100, decimal_places=2, default=Decimal('0'))
    
    def __str__(self) -> str:
        return self.registration_number
    