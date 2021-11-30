from django.db import models
from apps.leagues.models.models import League
from apps.general.models.generals import StillActive, BaseModel, PLTSBaseModel
from apps.general.models.choices import SPORT_BRANDS
import math


class Team(StillActive, BaseModel, PLTSBaseModel):
    name = models.CharField(max_length=30)
    team_logo = models.ImageField(blank=True, null=True)
    history = models.TextField()
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    description = models.TextField()
    position = models.PositiveIntegerField()
    budget = models.PositiveIntegerField()
    fanbase = models.PositiveIntegerField()
    sponsors = models.CharField(max_length=30)
    second_name = models.CharField(max_length=30)
    sport_brand = models.CharField(max_length=30, choices=SPORT_BRANDS)
    score = models.PositiveIntegerField(default=10)
    win = models.PositiveIntegerField(default=0)

    @property
    def games(self):
        return len(Game.objects.filter(home_team=self) | Game.objects.filter(away_team=self))

    @property
    def wins(self):
        return len(Game.objects.filter(winner=self))

    @property
    def defeats(self):
        return len(Game.objects.filter(loser=self))

    @property
    def points(self):
        return int(self.wins) * 2

    @property
    def percentage_of_wins(self):
        return round(((int(self.wins) / int(self.games)) * 100), 2)

    def __str__(self):
        return self.name


class Game(models.Model):
    home_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_team')
    away_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_team')
    winner = models.CharField(max_length=50, null=True, blank=True)
    loser = models.CharField(max_length=50, null=True, blank=True)
    home_team_goals = models.PositiveIntegerField(null=True, blank=True)
    away_team_goals = models.PositiveIntegerField(null=True, blank=True)

    @property
    def name(self):
        return f'{self.home_team} vs {self.away_team}'

    @property
    def win(self):
        if self.home_team.score > self.away_team.score:
            self.winner = self.home_team.name
            self.loser = self.away_team.name
            self.save()
            return self.home_team.name
        else:
            self.winner = self.away_team.name
            self.loser = self.home_team.name
            self.save()
            return self.away_team.name

    def __str__(self):
        return self.name


class TeamStats(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    goals_scored = models.PositiveIntegerField()
    goals_missed = models.PositiveIntegerField()
    matches = models.PositiveIntegerField()
    points = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.team}' stats" if self.team.name[-1] == 's' else f"{self.team}'s stats"


class Stadium(StillActive, BaseModel, PLTSBaseModel):
    name = models.CharField(max_length=50)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    max_capacity = models.PositiveIntegerField()
    avg_attendence = models.PositiveIntegerField()
    description = models.TextField()
    history = models.TextField()
    image = models.ImageField(blank=True, null=True)
    rebuild = models.BooleanField(default=True)

    def __str__(self):
        return self.name
