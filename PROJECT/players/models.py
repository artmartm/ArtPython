from django.db import models
from general.models import Country, StillActive, GeneralFields, City, GeneralFieldsPLTS, SPORT_BRANDS, AbstractCommentAndNews
from teams.models import Teams
import uuid

# Create your models here.

SHOOTS = [
    ('L', 'Left'),
    ('R', 'Right')
]

POSITIONS = [
    ('GK', 'Goalkeeper'),
    ('D', 'Defender'),
    ('F', 'Forward'),
]


class Players(StillActive, GeneralFields, GeneralFieldsPLTS):
    name = models.CharField(max_length=30)
    image = models.ImageField(blank=True, null=True)  # upload_to='images/'
    score = models.PositiveIntegerField()
    shoots = models.CharField(max_length=7, choices=SHOOTS, default='L')
    team = models.ForeignKey(Teams, on_delete=models.CASCADE)
    position = models.CharField(max_length=7, choices=POSITIONS, default='F')
    free_agent = models.BooleanField(default=False)
    playing_for_national_team = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class MainInfo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.ForeignKey(Players, on_delete=models.CASCADE)
    legionary = models.BooleanField(default=False)
    height = models.PositiveIntegerField()
    weight = models.PositiveIntegerField()
    captain = models.BooleanField(default=False)
    salary_per_year = models.PositiveIntegerField()
    sport_brand = models.CharField(max_length=15, choices=SPORT_BRANDS)
    contract_till = models.DateField()
    academy = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class PersonalInfo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.ForeignKey(Players, on_delete=models.CASCADE)
    favorite_color = models.CharField(max_length=30)
    favorite_music = models.CharField(max_length=30)
    favorite_movie = models.CharField(max_length=30)
    family = models.CharField(max_length=30)
    education = models.CharField(max_length=30)
    favorite_game = models.CharField(max_length=30)
    favorite_car = models.CharField(max_length=30)


class PlayerComments(AbstractCommentAndNews, StillActive, GeneralFields):
    to = models.ForeignKey(Players, on_delete=models.CASCADE)
    def __str__(self):
        return self.name


class PlayerNews(AbstractCommentAndNews, StillActive, GeneralFields):
    to=models.ForeignKey(Players, on_delete=models.CASCADE)
    body = models.TextField()

    def __str__(self):
        return self.name
