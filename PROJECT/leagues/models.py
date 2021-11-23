from django.db import models
from general.models import Country, StillActive, GeneralFields, City, GeneralFieldsPLTS, AbstractCommentAndNews


class Leagues(StillActive, GeneralFields, GeneralFieldsPLTS):
    name = models.CharField(max_length=30)
    league_logo = models.ImageField(blank=True, null=True) #upload_to='images/'
    history = models.TextField()
    description = models.TextField()
    founders = models.CharField(max_length=30)


    def __str__(self):
        return self.name


class LeagueComments(AbstractCommentAndNews, StillActive, GeneralFields):
    to = models.ForeignKey(Leagues, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class LeagueNews(AbstractCommentAndNews, StillActive, GeneralFields):
    to = models.ForeignKey(Leagues, on_delete=models.CASCADE)
    body = models.TextField()

    def __str__(self):
        return self.name
