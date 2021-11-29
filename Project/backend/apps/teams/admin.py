from django.contrib import admin
from .models.models import Team, Stadium, TeamStats

# Register your models here.
admin.site.register(Team)
admin.site.register(Stadium)
admin.site.register(TeamStats)
