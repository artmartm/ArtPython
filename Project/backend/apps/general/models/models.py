# from django.db import models
# from .generals import GeneralFields, GeneralFieldsForNewsComments, StillActive, GeneralCityCountryFields
# 
# class News(GeneralFields, GeneralFieldsForNewsComments):
#     """Model with all news"""
#     body = models.CharField(max_length=255)
# 
# 
#     def __str__(self):
#         return self.name
# 
# 
# class Comments(GeneralFields, GeneralFieldsForNewsComments):
#     """Model with all comments"""
#     def __str__(self):
#         return self.name
# 
# 
# class Country(GeneralFields, StillActive, GeneralCityCountryFields):
#     name = models.CharField(max_length=50)
#     language = models.CharField(max_length=30)
# 
#     def __str__(self):
#         return self.name
# 
#     class Meta:
#         verbose_name = 'Country'
#         verbose_name_plural = 'Countries'
# 
# 
# class City(GeneralFields, GeneralCityCountryFields):
#     name = models.CharField(max_length=100)
#     country = models.ForeignKey(Country, on_delete=models.CASCADE)
# 
#     def __str__(self):
#         return self.name
# 
#     class Meta:
#         verbose_name = 'City'
#         verbose_name_plural = 'Cities'
