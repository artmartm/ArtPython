from django.contrib import admin
from .models import UserProfile, UserSpecialFields

admin.site.register(UserProfile)
admin.site.register(UserSpecialFields)
