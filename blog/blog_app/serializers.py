from rest_framework import serializers
from .models import *


class ProjectSerializers(serializers.ModelSerializer):
    class Meta:
        model=Project
        fields=('id','name','startdate','enddate','comments')

         