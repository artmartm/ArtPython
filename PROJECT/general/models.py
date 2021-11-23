from django.db import models
from django.core.validators import MaxValueValidator
import uuid
from datetime import date
from django.contrib.auth.models import User


class GeneralFields(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateField(validators=[MaxValueValidator(limit_value=date.today)])

    class Meta:
        abstract = True


class GeneralCityCountryFields(models.Model):
    flag = models.ImageField(blank=True, null=True)
    coat_of_arms = models.ImageField(blank=True, null=True)
    area = models.IntegerField()
    populations = models.IntegerField()

    class Meta:
        abstract = True


class StillActive(models.Model):
    still_active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class AbstractCommentAndNews(models.Model):
    name = models.CharField(max_length=255)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class Country(GeneralFields, StillActive, GeneralCityCountryFields):
    name = models.CharField(max_length=50)
    language = models.CharField(max_length=30)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Country'
        verbose_name_plural = 'Countries'


class City(GeneralFields, GeneralCityCountryFields):
    name = models.CharField(max_length=100)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'City'
        verbose_name_plural = 'Cities'


class GeneralFieldsPLTS(models.Model):
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

    class Meta:
        abstract = True


SPORT_BRANDS = [
    ('CCM', 'CCM'),
    ('Under Armour', 'Under Armour'),
    ('Adidas', 'Adidas'),
    ('Reebok', 'Reebok'),
    ('New Balance', 'New Balance'),
    ('Bauer', 'Bauer'),
    ('Easton', 'Easton'),
]
