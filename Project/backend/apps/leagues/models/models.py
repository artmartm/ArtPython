from django.db import models
from apps.general.models import StillActive, BaseModel, PLTSBaseModel

class League(StillActive, BaseModel, PLTSBaseModel):
    name = models.CharField(max_length=30)
    league_logo = models.ImageField(blank=True, null=True, upload_to='leagues/')
    history = models.TextField()
    description = models.TextField()
    founders = models.CharField(max_length=30)

    def __str__(self):
        return self.name
