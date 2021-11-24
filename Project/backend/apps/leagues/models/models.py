from django.db import models
from apps.general.models.generals import StillActive, GeneralFields, GeneralFieldsPLTS

class Leagues(StillActive, GeneralFields, GeneralFieldsPLTS):
    name = models.CharField(max_length=30)
    league_logo = models.ImageField(blank=True, null=True)
    history = models.TextField()
    description = models.TextField()
    founders = models.CharField(max_length=30)

    def __str__(self):
        return self.name