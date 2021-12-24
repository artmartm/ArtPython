from django.db import models
from apps.leagues.models import League
from apps.general.models import StillActive, BaseModel, PLTSBaseModel
from apps.general.models import SPORT_BRANDS
from random import randint


def get_upload_to_teams(instance, name):
    return f'teams/{instance.name}/{name}'


class Team(StillActive, BaseModel, PLTSBaseModel):
    name = models.CharField(max_length=30)
    team_logo = models.ImageField(blank=True, null=True, upload_to=get_upload_to_teams)
    team_background = models.ImageField(blank=True, null=True, upload_to=get_upload_to_teams)
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
        return len(Game.objects.filter(home_team=self) | Game.objects.filter(away_team=self))

    @property
    def goals_scored(self):
        goals = sum(Game.objects.values_list('home_team_goals', flat=True).filter(home_team=self)) \
                + sum(Game.objects.values_list('away_team_goals', flat=True).filter(away_team=self))
        return goals

    @property
    def goals_missed(self):
        goals = sum(Game.objects.values_list('home_team_goals', flat=True).filter(away_team=self)) \
                + sum(Game.objects.values_list('away_team_goals', flat=True).filter(home_team=self))
        return goals

    @property
    def goals_difference(self):
        return self.goals_scored - self.goals_missed

    @property
    def wins(self):
        wins = len(Game.objects.filter(winner=self))
        return wins

    @property
    def wins_ot(self):
        wins = len(Game.objects.filter(winner_OT=self))
        return wins

    @property
    def defeats(self):
        return len(Game.objects.filter(loser=self))

    @property
    def defeats_ot(self):
        return len(Game.objects.filter(loser_OT=self))

    @property
    def points(self):
        return int(self.wins) * 2 + int(self.defeats_ot)

    @property
    def percentage_of_wins(self):
        if self.games > 0:
            return round(((int(self.wins) / int(self.games)) * 100), 2)
        return 'There is no games yet'

    def __str__(self):
        return self.name


class Stadium(StillActive, BaseModel, PLTSBaseModel):
    name = models.CharField(max_length=50)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    max_capacity = models.PositiveIntegerField()
    avg_attendence = models.PositiveIntegerField()
    description = models.TextField()
    history = models.TextField()
    image = models.ImageField(blank=True, null=True)
    background = models.ImageField(blank=True, null=True)

    def __str__(self):
        return self.name


class Game(models.Model):
    home_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_team')
    away_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_team')
    winner = models.CharField(max_length=50, null=True, blank=True, default=home_team)
    loser = models.CharField(max_length=50, null=True, blank=True, default=away_team)
    winner_OT = models.CharField(max_length=50, null=True, blank=True)
    loser_OT = models.CharField(max_length=50, null=True, blank=True)
    home_team_goals = models.PositiveIntegerField(null=True, blank=True, default=2)
    away_team_goals = models.PositiveIntegerField(null=True, blank=True, default=1)

    @property
    def name(self):
        return f'{self.home_team} vs {self.away_team}'

    @property
    def stadium(self):
        return Stadium.objects.values_list('name', flat=True).get(team=self.home_team)

    rand = randint(1, Team.objects.count())

    @property
    def win(self):
        return self.home_team

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
