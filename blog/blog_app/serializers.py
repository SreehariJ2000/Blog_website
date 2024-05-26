from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customuser
        fields=('id','email','username')

class UserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = Customuser
        fields = ("id", "username", "email", "password1", "password2")
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError("Passwords do not match!")

        password = attrs.get("password1", "")
        if len(password) < 8:
            raise serializers.ValidationError(
                "Passwords must be at least 8 characters!")

        return attrs

    def create(self, validated_data):
        password = validated_data.pop("password1")
        validated_data.pop("password2")

        return Customuser.objects.create_user(password=password, **validated_data)





class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials!")    
    



class ProjectSerializers(serializers.ModelSerializer):
    class Meta:
        model=Project
        fields=('id','name','projectmanager','startdate','enddate','comments')


class ProjectManagerSerializers(serializers.ModelSerializer):
    class Meta:
        model=ProjectManager
        fields=('id','name')

class YourModelSerilizer(serializers.ModelSerializer):
     class Meta:
        model = YourModel
        fields = ['id', 'name', 'description', 'gender']


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model=Image
        fields=['id', 'image', 'uploaded_at']