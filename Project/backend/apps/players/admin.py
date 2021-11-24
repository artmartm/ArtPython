from django.contrib import admin
from .models.models import Players, PersonalInfo, MainInfo
# Register your models here.

admin.site.register(Players)
admin.site.register(PersonalInfo)
admin.site.register(MainInfo)