from django.contrib import admin
from .models.models import Team, Stadium, TeamStats, Game

# Register your models here.
admin.site.register(Team)
admin.site.register(Game)
admin.site.register(Stadium)
admin.site.register(TeamStats)
