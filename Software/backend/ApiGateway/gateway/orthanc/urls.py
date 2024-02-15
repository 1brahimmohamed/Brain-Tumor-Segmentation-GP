from django.urls import path
from . import views

urlpatterns = [
    path('proxy/<str:orthanc_url>', views.orthanc_dicomweb_proxy),
    path('studies', views.getAllStudies),
    path('studies/<str:study_uid>', views.getStudy),
    path('studies/<str:study_uid>/series/<str:series_uid>/image', views.getSeriesImages)
]
