from rest_framework import viewsets, permissions, status
from rest_framework.response import Response

from django.contrib.auth import authenticate, login, logout
from gateway.models import User
from gateway.serializers import UserSerializer
from django.views.decorators.csrf import csrf_exempt


class UserViewSet(viewsets.ModelViewSet):
    @csrf_exempt
    def list(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)

        return Response({
            'status': "success",
            'length': len(serializer.data),
            'data': {
                'users': serializer.data
            }
        }, status=status.HTTP_200_OK)

    @csrf_exempt
    def create(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
            'status': "success",
            'data': {
                'user': serializer.data
            }
        }, status=status.HTTP_201_CREATED)

    @csrf_exempt
    def retrieve(self, request, pk=None):
        product = User.objects.get(id=pk)
        serializer = UserSerializer(product)

        return Response({
            'status': "success",
            'data': {
                'user': serializer.data
            }
        }, status=status.HTTP_200_OK)

    @csrf_exempt
    def update(self, request, pk=None):
        user = User.objects.get(id=pk)
        serializer = UserSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
            'status': "success",
            'data': {
                'user': serializer.data
            }
        }, status=status.HTTP_200_OK)

    @csrf_exempt
    def destroy(self, request, pk=None):
        user = User.objects.get(id=pk)
        user.delete()

        return Response({
            'status': "success",
            'data': None
        }, status=status.HTTP_204_NO_CONTENT)

