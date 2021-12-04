from django.db import models
from django.core.validators import MaxValueValidator
from datetime import date
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from smart_selects.db_fields import ChainedForeignKey


class BaseModel(models.Model):
    """General fields for all models"""
    created_at = models.DateField(auto_now_add=True, validators=[MaxValueValidator(limit_value=date.today)])

    class Meta:
        abstract = True


class LocationBaseModel(models.Model):
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


class NewsCommentsBaseModel(models.Model):
    """General fields for news and comments"""
    name = models.CharField(max_length=255)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    class Meta:
        abstract = True


class News(BaseModel, NewsCommentsBaseModel):
    """Model with all news"""
    body = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Comments(BaseModel, NewsCommentsBaseModel):
    """Model with all comments"""

    def __str__(self):
        return self.name


class Country(BaseModel, StillActive, LocationBaseModel):
    name = models.CharField(max_length=50)
    language = models.CharField(max_length=30)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Country'
        verbose_name_plural = 'Countries'


class City(BaseModel, LocationBaseModel):
    name = models.CharField(max_length=100)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'City'
        verbose_name_plural = 'Cities'


class PLTSBaseModel(models.Model):
    """General fields for players/teams/leagues/stadiums"""
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    city = ChainedForeignKey(
        City,
        chained_field="country",
        chained_model_field="country",
        show_all=False,
        auto_choose=True
    )

    class Meta:
        abstract = True


class Just2(models.Model):
    """General fields for news and comments"""
    name = models.CharField(max_length=255)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    def __str__(self):
        return self.name