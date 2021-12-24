from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth.models import User


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'


class UsersListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserListDetailSerializer(UsersListSerializer):
    profile = serializers.SerializerMethodField()

    @staticmethod
    def get_profile(user):
        profile = UserProfileSerializer(UserProfile.objects.filter(user=user), many=True).data
        return profile
