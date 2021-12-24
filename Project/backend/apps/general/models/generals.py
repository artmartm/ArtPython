from django.core.validators import MaxValueValidator
from datetime import date
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models

from django_countries.fields import CountryField


class BaseModel(models.Model):
    """General fields for all models"""
    created_at = models.DateField(auto_now_add=True, validators=[MaxValueValidator(limit_value=date.today)])

    class Meta:
        abstract = True


class StillActive(models.Model):
    """Check if player/team/league...etc still active"""
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
        ordering = ['-created_at']


class News(BaseModel, NewsCommentsBaseModel):
    """Model with all news"""
    body = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'News'
        verbose_name_plural = 'News'


class Comments(BaseModel, NewsCommentsBaseModel):
    """Model with all comments"""

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Comments'
        verbose_name_plural = 'Comments'


class PLTSBaseModel(models.Model):
    """General fields for players/teams/leagues/stadiums"""
    country = CountryField()

    class Meta:
        abstract = True

