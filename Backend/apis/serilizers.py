from rest_framework import serializers
from .models import Scenario,ScenarioSolution

class UserSerializer(serializers.ModelSerializer):
    # user = serializers.CharField(source='user',read_only=True)
    class Meta:
        model = Scenario
        fields = ['user','response_data']
        

class SolutionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ScenarioSolution
        fields = ['user', 'trainingdata']
                
