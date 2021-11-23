from django.shortcuts import render

# Create your views here.

def leagues(request):
    return render(request, 'leagues.html')