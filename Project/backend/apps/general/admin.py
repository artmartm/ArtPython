from django.contrib import admin
from .models import Comments, News

# Register your models here.
admin.site.register(News)
admin.site.register(Comments)
