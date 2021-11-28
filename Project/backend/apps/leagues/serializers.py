from .models.models import League
from rest_framework import serializers
# from settings.apps.teams.serializers import TeamSerializers
from apps.teams.models.models import Team
from apps.general.models.generals import News
from apps.teams.serializers import TeamSerializers
from apps.general.serializers import NewsSerializers


class LeagueSerializers(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = '__all__'


class LeagueDetailSerializer(LeagueSerializers):
    teams = serializers.SerializerMethodField()
    cm = serializers.SerializerMethodField()

    @staticmethod
    def get_teams(league):
        """return nested list of teams for the league"""
        teams = TeamSerializers(Team.objects.filter(league=league), many=True).data
        return teams

    @staticmethod
    def get_cm(id):
        news = NewsSerializers(News.objects.filter(content_type=13).filter(object_id=id.id), many=True).data
        return news
