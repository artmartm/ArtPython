from django.db import models
from apps.teams.models.models import Teams
from apps.general.models.choices import SHOOTS, SPORT_BRANDS, POSITIONS
from apps.general.models.generals import StillActive, BaseModel, PLTSBaseModel


class Player(StillActive, BaseModel, PLTSBaseModel):
    name = models.CharField(max_length=50)
    image = models.ImageField(blank=True, null=True)  # upload_to='images/'
    score = models.PositiveIntegerField()
    shoots = models.CharField(max_length=7, choices=SHOOTS, default='L')
    team = models.ForeignKey(Teams, on_delete=models.CASCADE)
    position = models.CharField(max_length=7, choices=POSITIONS, default='F')
    free_agent = models.BooleanField(default=False)
    playing_for_national_team = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class PlayerMainInfo(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    legionary = models.BooleanField(default=False)
    height = models.PositiveIntegerField()
    weight = models.PositiveIntegerField()
    captain = models.BooleanField(default=False)
    salary_per_year = models.PositiveIntegerField()
    sport_brand = models.CharField(max_length=15, choices=SPORT_BRANDS)
    contract_till = models.DateField()
    academy = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class PlayerPersonalInfo(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    favorite_color = models.CharField(max_length=30)
    favorite_music = models.CharField(max_length=30)
    favorite_movie = models.CharField(max_length=30)
    family = models.CharField(max_length=30)
    education = models.CharField(max_length=50)
    favorite_game = models.CharField(max_length=30)
    favorite_car = models.CharField(max_length=30)
