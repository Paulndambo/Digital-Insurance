from django.db import models

from apps.core.models import AbstractBaseModel
from apps.core.constants import SchemeTypes
# Create your models here.
class Scheme(AbstractBaseModel):
    name = models.CharField(max_length=255)
    scheme_type = models.CharField(max_length=255, choices=SchemeTypes.choices())
    max_members = models.IntegerField(default=1)
    
    def __str__(self):
        return self.name


class SchemeGroup(AbstractBaseModel):
    scheme = models.ForeignKey(Scheme, on_delete=models.CASCADE)
    policy = models.ForeignKey("policies.Policy", on_delete=models.CASCADE)
    
    
    def __str__(self):
        return self.scheme.name