from .models.models import Player, PlayerPersonalInfo, PlayerMainInfo
from rest_framework import serializers


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

    @staticmethod
    def get_main_info(player):
        """return nested list of teams for the league"""
        return PlayerMainInfoSerializers(PlayerMainInfo.objects.filter(player=player), many=True).data

    @staticmethod
    def get_personal_info(player):
        """return nested list of teams for the league"""
        return PlayerPersonalInfoSerializers(PlayerPersonalInfo.objects.filter(player=player), many=True).data


class PlayerMainInfoDetailSerializers(serializers.ModelSerializer):
    player = PlayerSerializers()

    class Meta:
        model = PlayerMainInfo
        fields = '__all__'
