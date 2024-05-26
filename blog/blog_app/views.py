from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets,permissions
from .models import *
from .serializers import *
from rest_framework.response import Response

from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import render
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status

class UserRegistrationAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        print("Received data:", request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {"refresh":str(token),
                          "access": str(token.access_token)}
        return Response(data, status= status.HTTP_201_CREATED)


class UserLoginAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data= request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        serializer = CustomUserSerializer(user)
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["tokens"] = {"refresh":str(token),  
                          "access": str(token.access_token)}
        return Response(data, status=status.HTTP_200_OK)
    
class UserLogoutAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)
    
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status= status.HTTP_400_BAD_REQUEST)




def Home(request):
    return HttpResponse('this is home')


class  ProjectViewSet(viewsets.ModelViewSet):
    permission_classes=[permissions.AllowAny]
    queryset=Project.objects.all()
    serializer_class=ProjectSerializers

    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    # def list(self, request):
    # queryset = self.queryset
    # serializer = self.serializer_class(queryset, many=True)
    # return Response(serializer.data)


    def create(self, request):
        serilizer=self.serializer_class(data=request.data)
        if serilizer.is_valid():
            serilizer.save()
            return Response(serilizer.data)
        else:
            return Response(serilizer.errors,status=404)
            

    def retrieve(self, request, pk=None):
        queryset=self.queryset.get(pk=pk)
        serializer=self.serializer_class(queryset)
        return Response(serializer.data)

    def update(self, request, pk=None):
        queryset=self.queryset.get(pk=pk)
        serilizer=self.serializer_class(queryset,data=request.data)
        if serilizer.is_valid():
            serilizer.save()
            return Response(serilizer.data)
        else:
            return Response(serilizer.errors,status=404)


    def destroy(self, request, pk=None):
        queryset=self.queryset.get(pk=pk)
        queryset.delete()
        return Response(status=204)  #HttpResponse



class YourModelViewSet(viewsets.ModelViewSet):
    queryset= YourModel.objects.all()
    serializer_class= YourModelSerilizer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    




class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    parser_classes = [MultiPartParser, FormParser]



class  ProjectManagerViewSet(viewsets.ModelViewSet):
    permission_classes=[permissions.AllowAny]
    queryset=ProjectManager.objects.all()
    serializer_class=ProjectManagerSerializers

    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    

class UserInfoAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CustomUserSerializer
    
    def get_object(self):
        return self.request.user