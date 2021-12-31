from django.db import models
from django.contrib.auth.models import User
from apps.teams.models.models import Team


class UserProfile(models.Model):
    """Set up user's favorite team"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    favorite_team = models.ForeignKey(Team, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username} profile'


class UserSpecialFields(models.Model):
    """Set up user's moderator role"""

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="special_fields")
    is_moderator = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'{self.user.username}\'s special fields'
