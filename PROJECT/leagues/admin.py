from django.contrib import admin
from .models import Leagues, LeagueComments, LeagueNews
# Register your models here.

admin.site.register(Leagues)
admin.site.register(LeagueNews)
admin.site.register(LeagueComments)
