from django.contrib import admin
from .models import Comments, News, City, Country, Just2

# Register your models here.
admin.site.register(Country)
admin.site.register(News)
admin.site.register(City)
admin.site.register(Comments)
admin.site.register(Just2)
