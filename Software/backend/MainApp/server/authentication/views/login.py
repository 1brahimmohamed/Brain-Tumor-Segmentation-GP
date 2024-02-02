from rest_framework import viewsets, status
from rest_framework.response import Response

from gateway.models import User


class LoginViewSet(viewsets.ModelViewSet):

    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if username is None or password is None:
            return Response({
                'status': 'fail',
                'message': 'Please provide both username and password'
            }, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(
            username=username,
        ).first()

        if user is None:
            return Response({
                'status': 'fail',
                'message': 'Invalid Credentials'
            }, status=status.HTTP_404_NOT_FOUND)

        if not user.check_password(password):

            return Response({
                'status': 'fail',
                'message': 'Invalid Credentials'
            }, status=status.HTTP_404_NOT_FOUND)

        return Response({
            'status': 'success',
            'data': {
                "user": "Hima"
            }
        })
