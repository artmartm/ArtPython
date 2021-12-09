from .models.models import League
from rest_framework import serializers
from apps.teams.models.models import Team
from apps.general.models.generals import News, Comments
from apps.teams.serializers import TeamSerializers
from apps.general.serializers import NewsSerializers, CommentsSerializers
from django.contrib.contenttypes.models import ContentType


class LeagueSerializers(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = '__all__'


class LeagueDetailSerializer(LeagueSerializers):
    teams = serializers.SerializerMethodField()
    news = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    id_league = ContentType.objects.values_list('id', flat=True).get(model='league')

    @staticmethod
    def get_teams(league):
        """return nested list of teams for the league"""
        teams = TeamSerializers(Team.objects.filter(league=league), many=True).data
        return teams

    @staticmethod
    def get_news(league, id_league=id_league):
        """return nested list of news for the league"""
        news = NewsSerializers(News.objects.filter(content_type=id_league).
                               filter(object_id=league.id), many=True).data
        return news

    @staticmethod
    def get_comments(league, id_league=id_league):
        """return nested list of comments for the league"""
        comments = CommentsSerializers(Comments.objects.filter(content_type=id_league).
                                       filter(object_id=league.id), many=True).data
        return comments
