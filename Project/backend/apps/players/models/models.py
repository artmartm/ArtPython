from django.db import models
from apps.teams.models.models import Team
from apps.general.models import SHOOTS, SPORT_BRANDS, POSITIONS
from apps.general.models import StillActive, BaseModel, PLTSBaseModel
from datetime import date


class Player(StillActive, BaseModel, PLTSBaseModel):
    name = models.CharField(max_length=50)
    image = models.ImageField(blank=True, null=True)
    background = models.ImageField(blank=True, null=True, default=None)
    score = models.PositiveIntegerField()
    shoots = models.CharField(max_length=7, choices=SHOOTS, default='L')
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    position = models.CharField(max_length=7, choices=POSITIONS, default='F')
    playing_for_national_team = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    @property
    def free_agent(self):
        result = date.today() >= PlayerMainInfo.objects.values_list('contract_till', flat=True).get(player=self.id)
        return result


class PlayerMainInfo(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    height = models.PositiveIntegerField()
    weight = models.PositiveIntegerField()
    captain = models.BooleanField(default=False)
    salary_per_year = models.PositiveIntegerField()
    sport_brand = models.CharField(max_length=15, choices=SPORT_BRANDS)
    contract_till = models.DateField()
    academy = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.player.name} main info'

    @property
    def legionary(self):
        player_country = Player.objects.values_list('country', flat=True).get(id=self.player.id)
        team_country = Team.objects.values_list('country', flat=True).get(
            id=Player.objects.values_list('team', flat=True).get(id=self.player.id))
        result = player_country != team_country
        return result


class PlayerPersonalInfo(models.Model):
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


class HeadToHead(models.Model):
    player_1 = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='player_1')
    player_2 = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='player_2')
    date = models.DateTimeField(auto_now_add=True)

    @property
    def win(self):
        if self.player_1.score > self.player_2.score:
            return f'{self.player_1} won'
        else:
            return f'{self.player_2} won'

    def __str__(self):
        return f'{self.player_1} vs {self.player_2}'
