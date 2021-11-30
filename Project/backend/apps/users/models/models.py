from django.db import models
from django.contrib.auth.models import User
from apps.general.models.generals import City, Country
from apps.teams.models.generals import Team


class userProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    description = models.TextField(blank=True, null=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    favorite_team = models.ForeignKey(Team, on_delete=models.CASCADE)
    date_joined = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    is_moderator = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user.username} profile'
