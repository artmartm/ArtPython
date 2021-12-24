from .models import Comments, News
from rest_framework import serializers


class CommentsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Comments
        read_only_fields = (
            "created_at",
        )
        fields = '__all__'


class NewsSerializers(serializers.ModelSerializer):
    class Meta:
        model = News
        read_only_fields = (
            "created_at",
        )
        fields = '__all__'
