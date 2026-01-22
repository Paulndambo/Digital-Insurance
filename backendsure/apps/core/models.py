from django.db import models

# Create your models here.
class AbstractBaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True
        
        
class UserAction(AbstractBaseModel):
    action_title = models.CharField(max_length=255)
    action_type = models.CharField(max_length=255)
    action_description = models.TextField(null=True)
    
    def __str__(self):
        return self.action_title