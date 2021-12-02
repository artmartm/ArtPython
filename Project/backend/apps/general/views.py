from django.shortcuts import render, redirect
from rest_framework import viewsets, generics
from .models.generals import Comments, News, City, Country
from .serializers import CommentsSerializers, NewsSerializers, CitySerializers, CountrySerializers
#from apps.custom_permissions import CommentPermission


class CommentsViewSet(viewsets.ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializers
    #permission_classes = [CommentPermission]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializers

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializers


class CountryViewSet(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializers
