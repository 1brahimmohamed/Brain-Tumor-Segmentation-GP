from django.urls import path
from . import views

urlpatterns = [
    path('proxy/<path:dicom_web_path>', views.orthanc_dicomweb_proxy, name='orthanc_dicomweb_proxy'),
    path('studies', views.get_all_studies, name='get_all_studies'),
    path('studies/<str:study_uid>', views.get_study, name='get_study'),
    path('studies/<str:study_uid>/series/<str:series_uid>/image', views.get_series_image, name='get_series_image'),
    path('upload', views.upload_instances, name='upload_instances'),
    path('delete/studies/<str:study_orthanc_id>', views.delete_study, name='delete_study'),
    path('delete/series/<str:series_uid>', views.delete_series, name='delete_series'),
]
