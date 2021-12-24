from .models.models import Player, PlayerPersonalInfo, PlayerMainInfo, HeadToHead
from rest_framework import serializers
from apps.general.models import News, Comments
from apps.general.serializers import NewsSerializers, CommentsSerializers
from django.contrib.contenttypes.models import ContentType


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


class HeadToHeadSerializers(serializers.ModelSerializer):
    class Meta:
        model = HeadToHead
        fields = '__all__'


class PlayerDetailSerializers(PlayerSerializers):
    main_info = serializers.SerializerMethodField()
    personal_info = serializers.SerializerMethodField()
    news = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    free_agent = serializers.ReadOnlyField()
    id_player = ContentType.objects.values_list('id', flat=True).get(model='player')

    @staticmethod
    def get_news(player, id_player=id_player):
        news = NewsSerializers(News.objects.filter(content_type=id_player).
                               filter(object_id=player.id), many=True).data
        return news

    @staticmethod
    def get_comments(player, id_player=id_player):
        comments = CommentsSerializers(Comments.objects.filter(content_type=id_player).
                                       filter(object_id=player.id), many=True).data
        return comments

    @staticmethod
    def get_main_info(player):
        return PlayerMainInfoSerializers(PlayerMainInfo.objects.
                                         filter(player=player), many=True).data

    @staticmethod
    def get_personal_info(player):
        return PlayerPersonalInfoSerializers(PlayerPersonalInfo.objects.
                                             filter(player=player), many=True).data


class HeadToHeadDetailSerializers(HeadToHeadSerializers):
    win = serializers.ReadOnlyField()
