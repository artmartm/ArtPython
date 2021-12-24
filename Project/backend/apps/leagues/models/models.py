from django.db import models
from apps.general.models import StillActive, BaseModel, PLTSBaseModel


def get_upload_to_leagues(instance, name):
    return f'leagues/{instance.name}/{name}'


class League(StillActive, BaseModel, PLTSBaseModel):
    name = models.CharField(max_length=30)
    league_logo = models.ImageField(blank=True, null=True, upload_to=get_upload_to_leagues)
    history = models.TextField()
    description = models.TextField()
    founders = models.CharField(max_length=30)
    is_private = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Leagues'
        verbose_name_plural = 'Leagues'
