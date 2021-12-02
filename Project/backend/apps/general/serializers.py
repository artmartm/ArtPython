from .models.generals import Comments, News, City, Country
from rest_framework import serializers


class CommentsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Comments
        read_only_fields = (
            "created_at",
            "author",
        )
        fields = '__all__'


class NewsSerializers(serializers.ModelSerializer):
    class Meta:
        model = News
        read_only_fields = (
            "created_at",
            "author",
        )
        fields = '__all__'


class CitySerializers(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'


class CountrySerializers(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'
