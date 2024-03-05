from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .processing import extract_studies_metadata, extract_study_metadata
import requests
import environ
from django.views.decorators.csrf import csrf_exempt

env = environ.Env()
service_url = env('ORTHANC_URL')


@api_view(['GET'])
def orthanc_dicomweb_proxy(request):

    # get the orthanc url as param
    orthanc_url = request.query_params.get('orthanc_url')\

    if not orthanc_url:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'orthanc url is required'})

    # send request to orthanc server
    try:
        resp = requests.get(service_url + '/dicom-web/' + orthanc_url)
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    # check if data is json
    if 'application/dicom+json' in resp.headers['Content-Type']:
        return Response(status=status.HTTP_200_OK, data=resp.json())
    else:
        return HttpResponse(resp.content, content_type=resp.headers['Content-Type'])



@api_view(['GET'])
def get_all_studies(request):
    # send request to orthanc server
    try:
        studies_ids = requests.get(service_url + '/studies')
        studies_json = studies_ids.json()

        # get the metadata for each study
        studies_metadata_arr = []
        first_series_metadata_arr = []
        for study in studies_json:
            study_metadata = requests.get(service_url + '/studies/' + study)
            first_series = requests.get(service_url + '/series/' + study_metadata.json()['Series'][0])
            first_series_metadata_arr.append(first_series.json())
            studies_metadata_arr.append(study_metadata.json())

        # get the metadata for all the studies
        studies = extract_studies_metadata(studies_metadata_arr, first_series_metadata_arr)

    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(status=status.HTTP_200_OK, data=studies)

@api_view(['GET'])
def get_study(request, study_uid):

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
def get_series_image(request, study_uid, series_uid):
    try:
        image = requests.get(service_url + '/dicom-web/studies/' + study_uid + '/series/' + series_uid + '/rendered')
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return HttpResponse(image.content, content_type=image.headers['Content-Type'])

@csrf_exempt
@api_view(['POST'])
def upload_instances(request):

#     if not request.FILES:
#         return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'instances are required'})
#
#     uploaded_files = request.FILES.getlist('files[]')
#
#     files_to_send = []
#     for file in uploaded_files:
#         files_to_send.append(('file', file.read(), file.content_type))

    data = request.body

    # send request to orthanc server
    try:
        resp = requests.post(service_url + '/instances', files=data)
        print(resp.content)
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(status=status.HTTP_200_OK, data={'message': 'instances uploaded successfully'})
