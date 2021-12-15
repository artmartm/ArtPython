from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth.models import User


class UserProfileSerializer(serializers.ModelSerializer):
    # user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'


class UsersListSerializer(serializers.ModelSerializer):
    # user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'


class UserListDetailSerializer(UsersListSerializer):
    profile = serializers.SerializerMethodField()

    @staticmethod
    def get_profile(user):
        profile = UserProfileSerializer(UserProfile.objects.filter(user=user), many=True).data
        return profile
