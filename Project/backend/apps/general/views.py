from rest_framework import viewsets
from .models import Comments, News
from .serializers import CommentsSerializers, NewsSerializers
from apps.custom_permissions import OnlyLookOrRequestUser, OnlyLookOrAdminModerator, OnlyAdminOrModerator
import django_filters.rest_framework
from rest_framework import filters




class CommentsViewSet(viewsets.ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializers
    #permission_classes = [OnlyLookOrRequestUser]

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)
    # def perform_authentication(self, request):
    #     user=request.user

class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializers
    #permission_classes = [OnlyAdminOrModerator]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    action_to_serializer = {
        "retrieve": NewsSerializers
    }

    def get_serializer_class(self):
        return self.action_to_serializer.get(
            self.action,
            self.serializer_class
        )
