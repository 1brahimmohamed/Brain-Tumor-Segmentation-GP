from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_users),
    path('<int:id>/', views.getUser),
]

