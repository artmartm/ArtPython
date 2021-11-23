from django.contrib import admin
from .models import Teams,TeamComments,TeamNews,Stadium
# Register your models here.

admin.site.register(Teams)
admin.site.register(TeamComments)
admin.site.register(TeamNews)
admin.site.register(Stadium)
