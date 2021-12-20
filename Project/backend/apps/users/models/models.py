from django.db import models
from django.contrib.auth.models import User
from apps.general.models.generals import City
from apps.teams.models.models import Team
from django_countries.fields import CountryField


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    description = models.TextField(blank=True, null=True)
    country = CountryField()
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    favorite_team = models.ForeignKey(Team, on_delete=models.CASCADE)
    date_joined = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    ban = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user.username} profile'

    # @property
    # def id(self):
    #     return self.user


class UserSpecialFields(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="special_fields")
    is_moderator = models.BooleanField(default=False)
