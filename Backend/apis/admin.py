from django.contrib import admin
from .models import CustomUser,Scenario,ScenarioSolution,ScenarioUser
# Register your models here.

admin.site.register(CustomUser)
admin.site.register(Scenario)
admin.site.register(ScenarioSolution)
admin.site.register(ScenarioUser)
