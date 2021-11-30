from django.db import models
from apps.leagues.models.models import League
from apps.general.models.generals import StillActive, BaseModel, PLTSBaseModel
from apps.general.models.choices import SPORT_BRANDS


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

    @property
    def games(self):
        return len(Game.objects.filter(t1=self) | Game.objects.filter(t2=self))

    @property
    def wins(self):
        return len(Game.objects.filter(wins=self))

    @property
    def points(self):
        return int(self.wins) * 2


class Game(models.Model):
    home_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_team')
    away_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_team')
    wins = models.CharField(max_length=50)
    home_team_goals = models.PositiveIntegerField()
    away_team_goals = models.PositiveIntegerField()

    @property
    def name(self):
        return f'{self.t1} vs {self.t2}'

    def win(self):
        if self.t1.score > self.t2.score:
            self.wins = self.t1.name
            self.t1_goals = self.t1.score - self.t2.score
            self.save()
        else:
            self.wins = self.t2.name
            self.t2_goals = 0
            self.save()

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
