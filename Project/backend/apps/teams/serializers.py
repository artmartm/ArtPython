from .models.models import Team, Stadium, Game
from rest_framework import serializers
from apps.players.models.models import Player
from apps.players.serializers import PlayerSerializers
from apps.general.models import News, Comments
from apps.general.serializers import NewsSerializers, CommentsSerializers
from django.contrib.contenttypes.models import ContentType


class TeamSerializers(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'


class StadiumSerializers(serializers.ModelSerializer):
    games = serializers.SerializerMethodField()
    percentage = serializers.ReadOnlyField()

    @staticmethod
    def get_games(team):
        games = len(Game.objects.filter(home_team=team.team))
        return games

    class Meta:
        model = Stadium
        fields = '__all__'


class GameSerializers(serializers.ModelSerializer):
    class Meta:
        model = Game
        read_only_fields = (
            "winner",
            "loser",
            "home_team_goals",
            "away_team_goals",
            "lucky",
            "lucky_overtime",
            "lucky_score",
            "winner_OT",
            "loser_OT",
        )
        fields = '__all__'

    def validate(self, data):
        """
        Check that home team and away team are different.
        """
        if data['home_team'] == data['away_team']:
            raise serializers.ValidationError("teams must be different")
        return data


class TeamDetailSerializer(TeamSerializers):
    players = serializers.SerializerMethodField()
    news = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    stadium = serializers.SerializerMethodField()
    team_stats = serializers.SerializerMethodField()
    matches = serializers.SerializerMethodField()
    # read only
    goals_difference = serializers.ReadOnlyField()
    points = serializers.ReadOnlyField()
    wins = serializers.ReadOnlyField()
    wins_ot = serializers.ReadOnlyField()
    games = serializers.ReadOnlyField()
    defeats = serializers.ReadOnlyField()
    defeats_ot = serializers.ReadOnlyField()
    goals_scored = serializers.ReadOnlyField()
    goals_missed = serializers.ReadOnlyField()
    percentage_of_wins = serializers.ReadOnlyField()
    id_team = ContentType.objects.values_list('id', flat=True).get(model='team')

    @staticmethod
    def get_news(team, id_team=id_team):
        news = NewsSerializers(News.objects.filter(content_type=id_team).
                               filter(object_id=team.id), many=True).data
        return news

    @staticmethod
    def get_comments(team, id_team=id_team):
        comments = CommentsSerializers(Comments.objects.filter(content_type=id_team).
                                       filter(object_id=team.id), many=True).data
        return comments

    @staticmethod
    def get_players(team):
        players = PlayerSerializers(Player.objects.filter(team=team), many=True).data
        return players

    @staticmethod
    def get_stadium(team):
        stadium = StadiumSerializers(Stadium.objects.filter(team=team), many=True).data
        return stadium

    @staticmethod
    def get_matches(team):
        matches = []
        home_matches = GameSerializers(Game.objects.filter(home_team=team), many=True).data
        away_matches = GameSerializers(Game.objects.filter(away_team=team), many=True).data
        matches.extend(home_matches)
        matches.extend(away_matches)
        return matches


class StadiumDetailSerializers(StadiumSerializers):
    news = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    id_stadium = ContentType.objects.values_list('id', flat=True).get(model='stadium')

    @staticmethod
    def get_news(stadium, id_stadium=id_stadium):
        news = NewsSerializers(News.objects.filter(content_type=id_stadium).
                               filter(object_id=stadium.id), many=True).data
        return news

    @staticmethod
    def get_comments(stadium, id_stadium=id_stadium):
        comments = CommentsSerializers(Comments.objects.filter(content_type=id_stadium).
                                       filter(object_id=stadium.id), many=True).data
        return comments


class GameDetailSerializers(GameSerializers):
    stadium = serializers.ReadOnlyField()
    name = serializers.ReadOnlyField()
    win = serializers.ReadOnlyField()
