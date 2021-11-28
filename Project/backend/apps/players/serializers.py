from .models.models import Player, PlayerPersonalInfo, PlayerMainInfo
from rest_framework import serializers
from apps.general.models.generals import News, Comments
from apps.general.serializers import NewsSerializers, CommentsSerializers


class PlayerSerializers(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'


class PlayerPersonalInfoSerializers(serializers.ModelSerializer):
    class Meta:
        model = PlayerPersonalInfo
        fields = '__all__'


class PlayerMainInfoSerializers(serializers.ModelSerializer):
    class Meta:
        model = PlayerMainInfo
        fields = '__all__'


###DETAIL


class PlayerDetailSerializers(PlayerSerializers):
    main_info = serializers.SerializerMethodField()
    personal_info = serializers.SerializerMethodField()
    news = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    @staticmethod
    def get_news(id):
        news = NewsSerializers(News.objects.filter(content_type=19).filter(object_id=id.id), many=True).data
        return news

    @staticmethod
    def get_comments(id):
        comments = CommentsSerializers(Comments.objects.filter(content_type=19).filter(object_id=id.id), many=True).data
        return comments

    @staticmethod
    def get_main_info(player):
        return PlayerMainInfoSerializers(PlayerMainInfo.objects.filter(player=player), many=True).data

    @staticmethod
    def get_personal_info(player):
        return PlayerPersonalInfoSerializers(PlayerPersonalInfo.objects.filter(player=player), many=True).data
