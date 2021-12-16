from django.urls import path, include
from rest_framework import routers
from apps.general.views import CommentsViewSet, NewsViewSet, CityViewSet, JustView  # , home
from apps.leagues.views import LeagueViewSet
from apps.teams.views import StadiumViewSet, GameViewSet, TeamViewSet, clean
from apps.players.views import PlayerViewSet, PlayerMainInfoViewSet, PlayerPersonalInfoViewSet, HeadToHeadViewSet
from apps.users.views import UsersViewSet, UsersListViewSet

# from django.urls import path
# from .views import MyTokenObtainPairView
#
# from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
# general
router.register(r'comments', CommentsViewSet)
router.register(r'news', NewsViewSet)
router.register(r'cities', CityViewSet)
router.register(r'just', JustView)
# league
router.register(r'leagues', LeagueViewSet)
# player
router.register(r'head-to-head', HeadToHeadViewSet)
router.register(r'players', PlayerViewSet)
router.register(r'player-main-info', PlayerMainInfoViewSet)
router.register(r'player-personal-info', PlayerPersonalInfoViewSet)
# team
router.register(r'teams', TeamViewSet)
router.register(r'stadiums', StadiumViewSet)
router.register(r'games', GameViewSet)
# users
router.register(r'users-profile', UsersViewSet)
router.register(r'users2', UsersListViewSet)
#########

urlpatterns = [
    path('api/', include(router.urls)),
    # path('', home),
    path('clean', clean),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
    #     path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    #     path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
