from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import render
from gateway.models import User
from gateway.serializers import UserSerializer


# Create your views here.

@api_view(['GET'])
def get_users(request):
    try:
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    return Response(status=status.HTTP_200_OK, data=serializer.data)


@api_view(['GET'])
def getUser(request, id):
    try:
        user = User.objects.get(id=int(id))
        serializer = UserSerializer(user)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    return Response(status=status.HTTP_200_OK, data=serializer.data)


