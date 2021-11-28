from .models.models import Team, Stadium, Game
from rest_framework import serializers
from apps.players.models.models import Player
from apps.players.serializers import PlayerSerializers
from apps.general.models.generals import News, Comments
from apps.general.serializers import NewsSerializers, CommentsSerializers


class TeamSerializers(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'


class StadiumSerializers(serializers.ModelSerializer):
    class Meta:
        model = Stadium
        fields = '__all__'


class GameSerializers(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'


### DETAIALS


class TeamDetailSerializer(TeamSerializers):
    players = serializers.SerializerMethodField()
    news = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    stadium = serializers.SerializerMethodField()

    @staticmethod
    def get_news(id):
        news = NewsSerializers(News.objects.filter(content_type=16).filter(object_id=id.id), many=True).data
        return news

    @staticmethod
    def get_comments(id):
        comments = CommentsSerializers(Comments.objects.filter(content_type=16).filter(object_id=id.id), many=True).data
        return comments

    @staticmethod
    def get_players(team):
        players = PlayerSerializers(Player.objects.filter(team=team), many=True).data
        return players

    @staticmethod
    def get_stadium(team):
        stadium = StadiumSerializers(Stadium.objects.filter(team=team), many=True).data
        return stadium