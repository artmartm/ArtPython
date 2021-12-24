class Game(models.Model):
    home_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_team')
    away_team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_team')
    winner = models.CharField(max_length=50, null=True, blank=True)
    loser = models.CharField(max_length=50, null=True, blank=True)
    winner_OT = models.CharField(max_length=50, null=True, blank=True)
    loser_OT = models.CharField(max_length=50, null=True, blank=True)
    home_team_goals = models.PositiveIntegerField(null=True, blank=True)
    away_team_goals = models.PositiveIntegerField(null=True, blank=True)

    @property
    def name(self):
        return f'{self.home_team} vs {self.away_team}'

    @property
    def stadium(self):
        return Stadium.objects.values_list('name', flat=True).get(team=self.home_team)

    rand = randint(1, Team.objects.count())

    @property
    def win(self):
        # rand = randint(1, Team.objects.count())
        def get_rand():
            return randint(1, Team.objects.count())

        rand = get_rand()
        home_team_players_score = Player.objects.values_list('score', flat=True).filter(team=self.home_team)
        away_team_players_score = Player.objects.values_list('score', flat=True).filter(team=self.away_team)
        home_team_game_points = sum(home_team_players_score) // 10 + self.home_team.score + 5
        away_team_game_points = sum(away_team_players_score) // 10 + self.away_team.score

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
        luck = abs(home_team_game_points - away_team_game_points) + 1
        #   rand = randint(1, Team.objects.count())
        over_time = False

        def get_the_score(home, away):
            # one_goal_difference = [(1,0),(2,1),()]
            ratio = home / away
            if ratio < 1.1:
                home_team_goals = 2
                away_team_goals = 1
            elif ratio < 1.2:
                home_team_goals = 3
                away_team_goals = 1
            elif ratio < 1.3:
                home_team_goals = 4
                away_team_goals = 1
            elif ratio < 1.4:
                home_team_goals = 5
                away_team_goals = 1
            else:
                home_team_goals = 6
                away_team_goals = 1
            return home_team_goals, away_team_goals

        if home_team_game_points == away_team_game_points:
            over_time = True

            rand_over_time = 1
            # rand_over_time = randint(1, 2)
            if rand_over_time == 1:
                # home_team_game_points += 1
                home_team_game_points = 1
            else:
                away_team_game_points = 1
                away_team_game_points += 1

        else:
            if self.rand == self.home_team.id and home_team_game_points < away_team_game_points:
                home_team_game_points += luck
            elif self.rand == self.away_team.id and away_team_game_points < home_team_game_points:
                away_team_game_points += luck
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
                self.save()
            if home_team_game_points % 10 < away_team_game_points % 10:
                # self.home_team_goals, self.away_team_goals = get_the_score(home_team_game_points, away_team_game_points)
                self.home_team_goals, self.away_team_goals = [100, 100]
                self.save()
            else:
                self.home_team_goals = home_team_game_points % 10
                self.away_team_goals = away_team_game_points % 10
                self.save()
            return home_team_game_points, away_team_game_points, self.rand
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
                self.save()
            if home_team_game_points % 10 > away_team_game_points % 10:
                # self.away_team_goals, self.home_team_goals = get_the_score(away_team_game_points, home_team_game_points)
                self.home_team_goals, self.away_team_goals = [100, 100]
                self.save()
            else:
                self.home_team_goals = home_team_game_points % 10
                self.away_team_goals = away_team_game_points % 10
                self.save()
            # self.save()
            return home_team_game_points, away_team_game_points, rand


    def __str__(self):
        return self.name