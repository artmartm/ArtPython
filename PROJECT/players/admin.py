from django.contrib import admin
from .models import Players, PersonalInfo, MainInfo, PlayerComments, PlayerNews
# Register your models here.

admin.site.register(Players)
admin.site.register(PersonalInfo)
admin.site.register(MainInfo)
admin.site.register(PlayerComments)
admin.site.register(PlayerNews)
