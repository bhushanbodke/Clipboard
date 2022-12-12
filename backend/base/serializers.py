from rest_framework import serializers
from .models import *


class FilesSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = '__all__'

class MessageSerialzer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = '__all__'