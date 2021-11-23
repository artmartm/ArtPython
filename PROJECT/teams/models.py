from django.db import models
from general.models import Country, StillActive, GeneralFields, City, GeneralFieldsPLTS, SPORT_BRANDS, AbstractCommentAndNews
from leagues.models import Leagues

class Teams(StillActive, GeneralFields, GeneralFieldsPLTS):
    name = models.CharField(max_length=30)
    team_logo = models.ImageField(blank=True, null=True) #upload_to='images/'
    history = models.TextField()
    league = models.ForeignKey(Leagues, on_delete=models.CASCADE)
    description = models.TextField()
    position = models.PositiveIntegerField()
    budget = models.PositiveIntegerField()
    fanbase = models.PositiveIntegerField()
    sponsors = models.CharField(max_length=30)
    second_name = models.CharField(max_length=30)
    sport_brand = models.CharField(max_length=15, choices=SPORT_BRANDS)
    
    #######
    @property
    def games(self):
        return len(Game.objects.filter(t1=self) | Game.objects.filter(t2=self))
       #####

    def __str__(self):
        return self.name


class Stadium(StillActive, GeneralFields, GeneralFieldsPLTS):
    name = models.CharField(max_length=50)
    team = models.ForeignKey(Teams, on_delete=models.CASCADE)
    max_capacity = models.PositiveIntegerField()
    avg_attendence = models.PositiveIntegerField()
    description = models.TextField()
    history = models.TextField()
    image = models.ImageField(blank=True, null=True)
    rebuild = models.BooleanField(default=True)
    def __str__(self):
        return self.name


class TeamComments(AbstractCommentAndNews, StillActive, GeneralFields):
    to = models.ForeignKey(Teams, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class TeamNews(AbstractCommentAndNews, StillActive, GeneralFields):
    to = models.ForeignKey(Teams, on_delete=models.CASCADE)
    body = models.TextField()

    def __str__(self):
        return self.name

    ############
class Game(models.Model):
    t1=models.ForeignKey(Teams, on_delete=models.CASCADE, related_name='t1')
    t2=models.ForeignKey(Teams, on_delete=models.CASCADE, related_name='t2')
