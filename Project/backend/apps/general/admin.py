from django.contrib import admin
from .models.models import Comments, News, City, Country

# Register your models here.
admin.site.register(Country)
admin.site.register(News)
admin.site.register(City)
admin.site.register(Comments)
