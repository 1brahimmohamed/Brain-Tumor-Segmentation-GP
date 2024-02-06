from django.urls import path
from . import views

urlpatterns = [
    path('proxy/<str:orthanc_url>', views.orthanc_dicomweb_proxy),
    path('studies', views.getAllStudies),
]