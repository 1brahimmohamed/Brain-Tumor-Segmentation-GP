from django.urls import path
from . import views

urlpatterns = [
    path('test', views.inference, name='inference'),
]
