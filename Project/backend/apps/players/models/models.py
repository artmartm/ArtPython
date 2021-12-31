from django.db import models
from apps.teams.models.models import Team
from apps.general.models import SHOOTS, SPORT_BRANDS, POSITIONS
from apps.general.models import StillActive, BaseModel, PLTSBaseModel
from datetime import date
from apps.general.uploads import get_upload_to_players


class Player(StillActive, BaseModel, PLTSBaseModel):
    """This model show all info about the player"""
    name = models.CharField(max_length=50)
    second_name = models.CharField(max_length=50, default='')
    image = models.ImageField(blank=True, null=True, upload_to=get_upload_to_players)
    background = models.ImageField(blank=True, null=True, default=None, upload_to=get_upload_to_players)
    score = models.PositiveIntegerField()
    shoots = models.CharField(max_length=10, choices=SHOOTS, default='L')
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    position = models.CharField(max_length=10, choices=POSITIONS, default='Forward')
    playing_for_national_team = models.BooleanField(default=True)
    player_number = models.PositiveIntegerField(default=10)
    captain = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    @property
    def free_agent(self):
        """Checks if the player is free agent"""
        result = date.today() >= PlayerMainInfo.objects.values_list('contract_till', flat=True).get(player=self.id)
        return result

    class Meta:
        verbose_name = 'Player'
        verbose_name_plural = 'Players'


class PlayerMainInfo(models.Model):
    """This model show all main info about the player"""
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    height = models.PositiveIntegerField()
    weight = models.PositiveIntegerField()
    salary_per_year = models.PositiveIntegerField()
    sport_brand = models.CharField(max_length=15, choices=SPORT_BRANDS)
    contract_till = models.DateField()
    academy = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.player.name} main info'

    @property
    def legionary(self):
        """Checks if the player is legionary"""
        player_country = Player.objects.values_list('country', flat=True).get(id=self.player.id)
        team_country = Team.objects.values_list('country', flat=True).get(
            id=Player.objects.values_list('team', flat=True).get(id=self.player.id))
        result = player_country != team_country
        return result

    class Meta:
        verbose_name = 'Player-Main-Info'
        verbose_name_plural = 'Player-Main-Info'


class PlayerPersonalInfo(models.Model):
    """This model show all personal info about the player"""
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    favorite_color = models.CharField(max_length=30)
    favorite_music = models.CharField(max_length=30)
    favorite_movie = models.CharField(max_length=30)
    family = models.CharField(max_length=30)
    education = models.CharField(max_length=50)
    favorite_game = models.CharField(max_length=30)
    favorite_car = models.CharField(max_length=30)

    def __str__(self):
        return f'{self.player.name} personal info'

    class Meta:
        verbose_name = 'Player-Personal-Info'
        verbose_name_plural = 'Player-Personal-Info'
