from django.db import models
import uuid
from django.core.validators import MaxValueValidator
from datetime import date


class StillActive(models.Model):
    """Abstract mode that checks if a team, a player or a league
    is still active"""
    still_active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class BaseModel(models.Model):
    """Abstract model with general fields"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    year = models.DateField(validators=[MaxValueValidator(limit_value=date.today)])
    country = models.CharField(max_length=30)

    class Meta:
        abstract = True


class League(BaseModel, StillActive):
    """Model with main information about the league"""

    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Team(BaseModel, StillActive):
    """Model with main information about the team"""

    name = models.CharField(max_length=30)
    team_logo = models.ImageField(blank=True, null=True)
    home_city = models.CharField(max_length=30)
    stadium = models.CharField(max_length=30)
    league = models.ForeignKey(League, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


SHOOTS = [
    ('L', 'Left'),
    ('R', 'Right')
]


class Player(BaseModel, StillActive):
    """Model with main information about the player"""

    name = models.CharField(max_length=30)
    portrait = models.ImageField(blank=True, null=True)
    score = models.IntegerField(default=75)
    current_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='players')
    shoots = models.CharField(max_length=7, choices=SHOOTS, default='left')
    city = models.CharField(max_length=30)
    legionary = models.BooleanField(default=False)
    height = models.IntegerField(null=True)
    weight = models.IntegerField(null=True)

    def __str__(self):
        return self.name
