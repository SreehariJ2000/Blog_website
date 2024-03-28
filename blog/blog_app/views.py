from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets,permissions
from .models import *
from .serializers import *
from rest_framework.response import Response


# Create your views here.
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
