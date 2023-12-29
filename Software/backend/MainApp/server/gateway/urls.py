from django.urls import path
from .views import UserViewSet

urlpatterns = [
    path('/', UserViewSet.as_view({
        'get': 'list',
        'post': 'create',
    })),

    path('/<int:pk>', UserViewSet.as_view({
        'get': 'retrieve',
        'patch': 'update',
        'delete': 'destroy',
    })),

]