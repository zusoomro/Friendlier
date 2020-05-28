from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    """ Profile serializer """
    class Meta:
        model = Profile
        fields = '__all__'
