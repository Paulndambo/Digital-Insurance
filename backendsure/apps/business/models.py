from django.db import models

from apps.core.models import AbstractBaseModel

class InsuredBusiness(AbstractBaseModel):
    BUSINESS_SIZES = [
        ('small', 'Small'),
        ('medium', 'Medium'),
        ('large', 'Large'),
    ]

    COVER_TYPES = [
        ('basic', 'Basic'),
        ('comprehensive', 'Comprehensive'),
    ]

    PREMISES_TYPES = [
        ('owned', 'Owned'),
        ('rented', 'Rented'),
    ]
    membership = models.ForeignKey("users.Membership", on_delete=models.CASCADE)
    policy = models.ForeignKey("policies.Policy", on_delete=models.CASCADE)
    scheme_group = models.ForeignKey("schemes.SchemeGroup", on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=255)
    registration_number = models.CharField(max_length=50, unique=True)
    industry = models.CharField(max_length=100)
    contact_email = models.EmailField()
    size = models.CharField(max_length=10, choices=BUSINESS_SIZES)
    annual_revenue = models.BigIntegerField()
    employee_count = models.PositiveIntegerField()
    has_security_measures = models.BooleanField(default=False)
    has_incident_response_plan = models.BooleanField(default=False)

    cover_limit = models.BigIntegerField()
    premium = models.DecimalField(max_digits=12, decimal_places=2)
    cover_type = models.CharField(max_length=20, choices=COVER_TYPES)

    property_cover = models.BigIntegerField()
    public_liability_cover = models.BigIntegerField()
    employer_liability_cover = models.BigIntegerField()
    interruption_cover = models.BigIntegerField()
    theft_cover = models.BooleanField(default=False)
    money_in_transit = models.BooleanField(default=False)
    electronic_equipment_cover = models.BigIntegerField()
    premises_type = models.CharField(max_length=20, choices=PREMISES_TYPES)


    def __str__(self):
        return self.name

