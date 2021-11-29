from .models.models import League
from rest_framework import serializers
from apps.teams.models.models import Team
from apps.general.models.generals import News, Comments
from apps.teams.serializers import TeamSerializers
from apps.general.serializers import NewsSerializers, CommentsSerializers


class LeagueSerializers(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = '__all__'


class LeagueDetailSerializer(LeagueSerializers):
    teams = serializers.SerializerMethodField()
    news = serializers.SerializerMethodField()
    comments= serializers.SerializerMethodField()
    @staticmethod
    def get_teams(league):
        """return nested list of teams for the league"""
        teams = TeamSerializers(Team.objects.filter(league=league), many=True).data
        return teams

    @staticmethod
    def get_news(id):
        news = NewsSerializers(News.objects.filter(content_type=13).filter(object_id=id.id), many=True).data
        return news

    @staticmethod
    def get_comments(id):
        comments = CommentsSerializers(Comments.objects.filter(content_type=13).filter(object_id=id.id), many=True).data
        return comments
