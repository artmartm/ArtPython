from django.contrib import admin
from .models.models import Player, PlayerPersonalInfo, PlayerMainInfo

admin.site.register(Player)
admin.site.register(PlayerPersonalInfo)
admin.site.register(PlayerMainInfo)
