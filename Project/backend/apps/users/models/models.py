from django.db import models
from django.contrib.auth.models import User
from apps.teams.models.models import Team
from django_countries.fields import CountryField


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    favorite_team = models.ForeignKey(Team, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username} profile'


class UserSpecialFields(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="special_fields")
    is_moderator = models.BooleanField(default=False)
    ban = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user.username}\'s special fields'
