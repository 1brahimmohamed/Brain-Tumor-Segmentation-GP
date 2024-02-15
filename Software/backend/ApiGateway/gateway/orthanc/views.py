from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .processing import extract_studies_metadata, extract_study_metadata
import requests
import environ

env = environ.Env()
service_url = env('ORTHANC_URL')


@api_view(['GET'])
def orthanc_dicomweb_proxy(request, orthanc_url=None):
    if orthanc_url is None:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'orthanc_url is required'})

    # send request to orthanc server
    try:
        resp = requests.get(service_url + '/dicom-web/' + orthanc_url)
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(status=status.HTTP_200_OK, data=resp.json())


@api_view(['GET'])
def getAllStudies(request):
    # send request to orthanc server
    try:
        studies_ids = requests.get(service_url + '/studies')
        studies_json = studies_ids.json()

        # get the metadata for each study
        studies_metadata = []
        for study in studies_json:
            study_metadata = requests.get(service_url + '/studies/' + study)
            studies_metadata.append(study_metadata.json())

        # get the metadata for all the studies
        studies = extract_studies_metadata(studies_metadata)

    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(status=status.HTTP_200_OK, data=studies)

@api_view(['GET'])
def getStudy(request, study_uid):

    # send request to orthanc server
    try:
        study = requests.get(service_url + '/dicom-web/studies/' + study_uid + '/series')
        study = study.json()

        # get the study metadata
        study_data = extract_study_metadata(study)

        # add the orthanc metadata to the response
        study_data['orthanc_metadata'] = study

    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(status=status.HTTP_200_OK, data=study_data)

@api_view(['GET'])
def getSeriesImages(request, study_uid, series_uid):
    try:
        image = requests.get(service_url + '/dicom-web/studies/' + study_uid + '/series/' + series_uid + '/rendered')
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return HttpResponse(image.content, content_type=image.headers['Content-Type'])
