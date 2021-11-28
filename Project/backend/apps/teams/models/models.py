from django.db import models
from apps.leagues.models.models import League
from apps.general.models.generals import StillActive, BaseModel, PLTSBaseModel
from apps.general.models.choices import SPORT_BRANDS


class Team(StillActive, BaseModel, PLTSBaseModel):
    name = models.CharField(max_length=30)
    team_logo = models.ImageField(blank=True, null=True, upload_to='teams/')
    history = models.TextField()
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    description = models.TextField()
    position = models.PositiveIntegerField()
    budget = models.PositiveIntegerField()
    fanbase = models.PositiveIntegerField()
    sponsors = models.CharField(max_length=30)
    second_name = models.CharField(max_length=30)
    sport_brand = models.CharField(max_length=30, choices=SPORT_BRANDS)

    #######
    @property
    def games(self):
        return len(Game.objects.filter(t1=self) | Game.objects.filter(t2=self))

    #####

    def __str__(self):
        return self.name


class Stadium(StillActive, BaseModel, PLTSBaseModel):
    name = models.CharField(max_length=50)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    max_capacity = models.PositiveIntegerField()
    avg_attendence = models.PositiveIntegerField()
    description = models.TextField()
    history = models.TextField()
    image = models.ImageField(blank=True, null=True, upload_to='teams/')
    rebuild = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    ############


class Game(models.Model):
    t1 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='t1')
    t2 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='t2')
