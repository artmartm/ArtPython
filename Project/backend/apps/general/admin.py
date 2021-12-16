from django.contrib import admin
from .models import Comments, News, City, Just2

# Register your models here.
admin.site.register(News)
admin.site.register(City)
admin.site.register(Comments)
admin.site.register(Just2)

