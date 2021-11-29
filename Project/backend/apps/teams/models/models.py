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
    win = models.PositiveIntegerField(default=0)

    #######
    @property
    def games(self):
        return len(Game.objects.filter(t1=self) | Game.objects.filter(t2=self))

    # @propertyasasdasdasd
    # def wiins(self):
    #     return len(Game.objects.filter(t1=self).filter(win=self) | Game.objects.filter(t2=self).filter(win=self))


    @property
    def won(self):
        if Game.objects.filter(t1=self) | Game.objects.filter(t2=self):
            return 'who win'
        return 'do not play'
        # if Game.objects.filter(t1=self) | Game.objects.filter(t2=self)):
        # if
        # return len(queryset.annotate(members=Count('players')).filter(members=value))
        #return Game.objects.values_list('win', flat=True).get(t1=self.id) | Game.objects.values_list('win',
             #                                                                                        flat=True).get(
         #   t2=self.id)

    ####

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

    ############


class Game(models.Model):
    t1 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='t1')
    t2 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='t2')
    wins = models.CharField(max_length=50, default=t1)

    @property
    def name(self):
        return f'{self.t1} vs {self.t2}'

    @property
    def win(self):
        if self.t1.score > self.t2.score:
            return self.t1
        return self.t2

    def __str__(self):
        return self.name
