from django.shortcuts import render
from rest_framework.response import Response
from .serializers import * 
import os
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# ---------------------- Files View ----------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def FilesView(request):
    files = Files.objects.filter(sender = request.user)
    serialize = FilesSerialzer(files,many = True)
    return Response(serialize.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def PostFiles(request):
    files = FilesSerialzer(data = request.data)
    if files.is_valid():
        files.save()
    print(files.errors)
    return Response("Success")

@api_view(['DELETE'])    
def FilesDelete(request,pk):
    file = Files.objects.get(id =pk)
    file.delete()
    filepath = str(file.Files).replace("/", "\\")
    os.remove("D:\\FileTransfer\\clipboard\\media\\"+filepath)
    return Response("deleted")    
    


# ------------------ Messages views ----------------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def MessageView(request):
    messages = Messages.objects.filter(owner = request.user)
    serialize = MessageSerialzer(messages,many = True)
    return Response(serialize.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def GetNo(request):
    No = Messages.objects.filter(owner = request.user).count()
    return Response(No)

@api_view(['DELETE'])    
def MessageDelete(request,pk):
    Messages.objects.get(id =pk).delete()
    return Response("deleted")



@api_view(['POST'])
def MessagePost(request):
    print(request.data)
    message = MessageSerialzer(data = request.data)
    if message.is_valid():
        message.save()
    return Response("sucess")

@api_view(['GET'])
def list(request):
    routes = [
        '/message',
        '/files'
    ]
    return Response(routes)



# Create your views here.
