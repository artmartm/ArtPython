from django.db import models
from django.core.validators import MaxValueValidator
#import uuid
from datetime import date
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType


class GeneralFields(models.Model):
    """General fields for all models"""
    #id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateField(validators=[MaxValueValidator(limit_value=date.today)])

    class Meta:
        abstract = True


class GeneralCityCountryFields(models.Model):
    """General fields for cities and countries"""
    flag = models.ImageField(blank=True, null=True)
    coat_of_arms = models.ImageField(blank=True, null=True)
    area = models.IntegerField()
    populations = models.IntegerField()

    class Meta:
        abstract = True


class StillActive(models.Model):
    """Check if player/team/league still playing"""
    still_active = models.BooleanField(default=True)

    class Meta:
        abstract = True

class GeneralFieldsForNewsComments(models.Model):
    """General fields for news and comments"""
    name = models.CharField(max_length=255)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    class Meta:
        abstract = True

class GeneralFieldsPLTS(models.Model):
    """General fields for players/teams/leagues/stadiums"""
    city = models.ForeignKey('City', on_delete=models.CASCADE)
    country = models.ForeignKey('Country', on_delete=models.CASCADE)
    comments = GenericRelation('comment')
    news = GenericRelation('news')
    class Meta:
        abstract = True