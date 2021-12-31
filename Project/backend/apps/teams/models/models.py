from django.db import models
from apps.leagues.models import League
from apps.general.models import StillActive, BaseModel, PLTSBaseModel
from apps.general.models import SPORT_BRANDS
from random import randint


def get_upload_to_teams(instance, name):
    """Set up upload path for teams"""

    return f'teams/{instance.name}/{name}'


class Team(StillActive, BaseModel, PLTSBaseModel):
    """This model show all info about the team"""

    name = models.CharField(max_length=30)
    team_logo = models.ImageField(blank=True, null=True, upload_to=get_upload_to_teams)
    team_background = models.ImageField(blank=True, null=True, upload_to=get_upload_to_teams)
    history = models.TextField()
    league = models.ForeignKey(League, on_delete=models.CASCADE)
    description = models.TextField()
    position = models.PositiveIntegerField()
    budget = models.PositiveIntegerField()
    fanbase = models.PositiveIntegerField()
    sponsors = models.CharField(max_length=30)
    second_name = models.CharField(max_length=30)
    sport_brand = models.CharField(max_length=30, choices=SPORT_BRANDS)
    score = models.PositiveIntegerField(default=10)

    @property
    def games(self):
        """Counts amount of games of the team"""

        return len(Game.objects.filter(home_team=self) | Game.objects.filter(away_team=self))

    @property
    def goals_scored(self):
        """Counts amount of scored goals of the team"""

        goals = sum(Game.objects.values_list('home_team_goals', flat=True).filter(home_team=self)) \
                + sum(Game.objects.values_list('away_team_goals', flat=True).filter(away_team=self))
        return goals

    @property
    def goals_missed(self):
        """Counts amount of missed goals of the team"""

        goals = sum(Game.objects.values_list('home_team_goals', flat=True).filter(away_team=self)) \
                + sum(Game.objects.values_list('away_team_goals', flat=True).filter(home_team=self))
        return goals

    @property
    def goals_difference(self):
        """Counts goals difference of the team"""

        return self.goals_scored - self.goals_missed

    @property
    def wins(self):
        """Counts amount of wins of the team"""

        wins = len(Game.objects.filter(winner=self))
        return wins

    @property
    def wins_ot(self):
        """Counts amount of overtime wins of the team"""

        wins = len(Game.objects.filter(winner_OT=self))
        return wins

    @property
    def defeats(self):
        """Counts amount of defeats of the team"""

        return len(Game.objects.filter(loser=self))

    @property
    def defeats_ot(self):
        """Counts amount of overtime defeats of the team"""

        return len(Game.objects.filter(loser_OT=self))

    @property
    def points(self):
        """Counts amount of points of the team"""

        return int(self.wins) * 2 + int(self.defeats_ot)

    @property
    def percentage_of_wins(self):
        """Counts percentage of wins of the team"""

        if self.games > 0:
            return round(((int(self.wins) / int(self.games)) * 100), 2)
        return 'There is no games yet'

    def __str__(self):
        return self.name


class Stadium(StillActive, BaseModel, PLTSBaseModel):
    """This model shows main info about the stadium"""

    name = models.CharField(max_length=50)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    max_capacity = models.PositiveIntegerField()
    avg_attendence = models.PositiveIntegerField()
    description = models.TextField()
    history = models.TextField()
    image = models.ImageField(blank=True, null=True)
    background = models.ImageField(blank=True, null=True)

    @property
    def percentage(self):
        """Counts percentage of attendance of the team"""

        return round(int(self.avg_attendence) / int(self.max_capacity), 2) * 100

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Stadium'
        verbose_name_plural = 'Stadiums'


from apps.players.models.models import Player


class Game(models.Model):
    """This model shows all info about the game"""

    home_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_team')
    away_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_team')
    winner = models.CharField(max_length=50, null=True, blank=True)
    loser = models.CharField(max_length=50, null=True, blank=True)
    winner_OT = models.CharField(max_length=50, null=True, blank=True)
    loser_OT = models.CharField(max_length=50, null=True, blank=True)
    home_team_goals = models.PositiveIntegerField(null=True, blank=True)
    away_team_goals = models.PositiveIntegerField(null=True, blank=True)
    lucky = models.PositiveIntegerField(default=0)
    lucky_overtime = models.PositiveIntegerField(default=0)
    lucky_score = models.PositiveIntegerField(default=0)

    @property
    def random_params(self):
        """Counts random params for the game"""

        randi = randint(1, Team.objects.count())
        randi_ot = randint(1, 3)
        randi_sc = randint(0, 8)
        if self.lucky == 0:
            self.lucky = randi
            self.lucky_overtime = randi_ot
            self.lucky_score = randi_sc
            self.save()
        return self.lucky, self.lucky_overtime, self.lucky_score

    @property
    def name(self):
        return f'{self.home_team} vs {self.away_team}'

    @property
    def stadium(self):
        """Set up the stadium for the game"""

        return Stadium.objects.values_list('id', flat=True).get(team=self.home_team)

    @property
    def win(self):
        """Set up who wins the game"""

        opinion = 'good game'
        home_team_players_score = Player.objects.values_list('score', flat=True).filter(team=self.home_team)
        away_team_players_score = Player.objects.values_list('score', flat=True).filter(team=self.away_team)
        home_team_game_points = (sum(home_team_players_score) / len(home_team_players_score)) // 10
        away_team_game_points = (sum(away_team_players_score) / len(away_team_players_score)) // 10
        home_team_game_points += (self.home_team.score + 5)
        away_team_game_points += self.away_team.score

        if away_team_players_score and home_team_players_score:
            if min(away_team_players_score) > min(home_team_players_score):
                away_team_game_points += 5
            elif min(away_team_players_score) < min(home_team_players_score):
                home_team_game_points += 5
            else:
                pass
            if max(away_team_players_score) > max(home_team_players_score):
                away_team_game_points += 10
            elif max(away_team_players_score) < max(home_team_players_score):
                home_team_game_points += 10
            else:
                pass
        if self.home_team.fanbase > self.away_team.fanbase:
            home_team_game_points += 5
        elif self.home_team.fanbase < self.away_team.fanbase:
            away_team_game_points += 5
        else:
            pass
        if Stadium.objects.values_list('avg_attendence', flat=True).filter(team=self.home_team).count():
            if sum(Stadium.objects.values_list('avg_attendence', flat=True).filter(team=self.home_team)) / sum(
                    Stadium.objects.values_list('max_capacity', flat=True).filter(team=self.home_team)) >= 0.95:
                home_team_game_points += 5
        luck_number = abs(home_team_game_points - away_team_game_points) + 1
        rand = self.random_params[0]
        over_time = False

        def get_the_score(winner_team, loser_team):
            """Set up the score of the game rely on game points"""

            one_goal_difference = [(1, 0), (2, 1), (3, 2), (4, 3), (5, 4), (6, 5), (7, 6), (8, 7), (9, 8)]
            two_goals_difference = [(2, 0), (3, 1), (4, 2), (5, 3), (6, 4), (7, 5), (8, 6), (9, 7)]
            three_goals_difference = [(3, 0), (4, 1), (5, 2), (6, 3), (7, 4), (8, 5), (9, 6)]
            four_goals_difference = [(4, 0), (5, 1), (6, 2), (7, 3), (8, 4), (9, 5)]
            five_goals_difference = [[5, 0], [6, 1], [7, 2], [8, 3], [9, 4]]
            winner_team_goals = 0
            loser_team_goals = 0
            if winner_team / loser_team < 1.1:
                winner_team_goals = one_goal_difference[self.random_params[2]][0]
                loser_team_goals = one_goal_difference[self.random_params[2]][1]
            elif winner_team / loser_team < 1.2:
                if self.random_params[2] > len(two_goals_difference) - 1:
                    winner_team_goals = two_goals_difference[-1][0]
                    loser_team_goals = two_goals_difference[-1][1]
                else:
                    winner_team_goals = two_goals_difference[self.random_params[2]][0]
                    loser_team_goals = two_goals_difference[self.random_params[2]][1]
            elif winner_team / loser_team < 1.3:
                if self.random_params[2] > len(three_goals_difference) - 1:
                    winner_team_goals = three_goals_difference[-1][0]
                    loser_team_goals = three_goals_difference[-1][1]
                else:
                    winner_team_goals = three_goals_difference[self.random_params[2]][0]
                    loser_team_goals = three_goals_difference[self.random_params[2]][1]
            elif winner_team / loser_team < 1.4:
                if self.random_params[2] > len(four_goals_difference) - 1:
                    winner_team_goals = four_goals_difference[-1][0]
                    loser_team_goals = four_goals_difference[-1][1]
                else:
                    winner_team_goals = four_goals_difference[self.random_params[2]][0]
                    loser_team_goals = four_goals_difference[self.random_params[2]][1]
            else:
                if self.random_params[2] > len(five_goals_difference) - 1:
                    winner_team_goals = five_goals_difference[-1][0]
                    loser_team_goals = five_goals_difference[-1][1]
                else:
                    winner_team_goals = five_goals_difference[self.random_params[2]][0]
                    loser_team_goals = five_goals_difference[self.random_params[2]][1]
            return winner_team_goals, loser_team_goals

        if home_team_game_points == away_team_game_points:
            over_time = True

            if self.random_params[1] == 1 or self.random_params[1] == 3:
                home_team_game_points += 1
            else:
                away_team_game_points += 1



        else:
            if rand == self.home_team.id and home_team_game_points < away_team_game_points:
                home_team_game_points += luck_number
                opinion = 'luck'
            elif rand == self.away_team.id and away_team_game_points < home_team_game_points:
                away_team_game_points += luck_number
                opinion = 'luck'
        if home_team_game_points > away_team_game_points:
            if over_time:
                self.winner_OT = self.home_team.name
                self.loser_OT = self.away_team.name
                self.winner = ""
                self.loser = ""
                self.save()
            else:
                self.winner_OT = ""
                self.loser_OT = ""
                self.winner = self.home_team.name
                self.loser = self.away_team.name
            if home_team_game_points % 10 <= away_team_game_points % 10:
                self.home_team_goals, self.away_team_goals = get_the_score(home_team_game_points, away_team_game_points)
                self.save()
            else:
                self.home_team_goals = home_team_game_points % 10
                self.away_team_goals = away_team_game_points % 10
                self.save()
            return home_team_game_points, away_team_game_points, opinion, over_time
        else:
            if over_time:
                self.winner_OT = self.away_team.name
                self.loser_OT = self.home_team.name
                self.winner = ""
                self.loser = ""
                self.save()
            else:
                self.winner_OT = ""
                self.loser_OT = ""
                self.winner = self.away_team.name
                self.loser = self.home_team.name
            if home_team_game_points % 10 > away_team_game_points % 10:
                self.away_team_goals, self.home_team_goals = get_the_score(away_team_game_points, home_team_game_points)
                self.save()
            else:
                self.home_team_goals = home_team_game_points % 10
                self.away_team_goals = away_team_game_points % 10
                self.save()
            return home_team_game_points, away_team_game_points, rand, opinion, over_time

    def __str__(self):
        return self.name
