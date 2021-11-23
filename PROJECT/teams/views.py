from django.shortcuts import render

# Create your views here.

def teams(request):
    team = Teams.objects.all()
    data ={'team':team}
    return render(request,'teams/res.html',data)
