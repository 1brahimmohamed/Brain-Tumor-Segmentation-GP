from django.urls import path
from . import views

urlpatterns = [
    path('segmentation', views.segmentation_inference, name='segmentation-inference'),
    path('motion', views.motion_inference, name='motion-inference'),
    path('synthesis', views.synthesis_inference, name='synthesis-inference'),
]
