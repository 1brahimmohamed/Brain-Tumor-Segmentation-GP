from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .processing import extract_studies_metadata, extract_study_metadata, check_is_dicom
import requests
import environ
from django.views.decorators.csrf import csrf_exempt
from requests.auth import HTTPBasicAuth

env = environ.Env()
service_url = env('ORTHANC_URL')
auth_cred = HTTPBasicAuth(env('ORTHANC_USER'), env('ORTHANC_PASSWORD'))

@api_view(['GET'])
def orthanc_dicomweb_proxy(request, dicom_web_path):

    if not dicom_web_path:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'orthanc url is required'})

    # send request to orthanc server
    try:
        resp = requests.get(service_url + '/dicom-web/' + dicom_web_path, auth=auth_cred)
    except Exception as e:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={'message': 'hima'})


    return HttpResponse(
        resp.content,
        headers=resp.headers,
    )



@api_view(['GET'])
def get_all_studies(request):
    # send request to orthanc server
    try:
        studies_ids = requests.get(service_url + '/studies', auth=auth_cred)
        studies_json = studies_ids.json()

        # get the metadata for each study
        studies_metadata_arr = []
        first_series_metadata_arr = []
        for study in studies_json:
            study_metadata = requests.get(service_url + '/studies/' + study, auth=auth_cred)
            first_series = requests.get(service_url + '/series/' + study_metadata.json()['Series'][0], auth=auth_cred)
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
        study = requests.get(service_url + '/dicom-web/studies/' + study_uid + '/series', auth=auth_cred)
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
        image = requests.get(service_url + '/dicom-web/studies/' + study_uid + '/series/' + series_uid + '/rendered', auth=auth_cred)
    except Exception as e:
        print(e)    
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return HttpResponse(image.content, content_type=image.headers['Content-Type'])

@csrf_exempt
@api_view(['POST'])
def upload_instances(request):
    
    if not request.FILES:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'instances are required'})

    file_obj = request.FILES['file']                                                            
    
    if not check_is_dicom(file_obj):
        return Response(status=status.HTTP_400_BAD_REQUEST, data={'message': 'file is not a dicom file'})

    try:
        file_obj.seek(0)
        files = {'file': (file_obj.name, file_obj.read(), file_obj.content_type)}
        
        requests.post(service_url + '/instances', files=files, auth=auth_cred)        
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(status=status.HTTP_200_OK, data={'message': 'instances uploaded successfully'})

@csrf_exempt
@api_view(['DELETE'])
def delete_study(request, study_orthanc_id):
    try:
        response = requests.delete(service_url + '/studies/' + study_orthanc_id, auth=auth_cred)
        if response.status_code == 200:
            return Response(status=status.HTTP_200_OK, data={'message': 'Study deleted successfully'})
        else:
            return Response(status=response.status_code, data=response.json())
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={'message': 'Failed to delete study'})

@api_view(['DELETE'])
def delete_series(request, series_uid):
    try:
        series_orthanc_id = get_orthanc_id_form_dicom_id(series_uid)

        if not series_orthanc_id:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={'message': 'Failed to get orthanc id'})

        response = requests.delete(f"{service_url}/series/{series_orthanc_id}", auth=auth_cred)
        if response.status_code == 200:
            return Response(status=status.HTTP_200_OK, data={'message': f'Series deleted successfully with orthanc id: {series_orthanc_id} and series_uid: {series_uid}'})
        else:
            return Response(status=response.status_code, data=response.json())
    except Exception as e:
        print(e)
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR, data={'message': 'Failed to delete series'})


def get_orthanc_id_form_dicom_id(dicom_id):
    try:
        response = requests.post(f"{service_url}/tools/lookup", data=dicom_id, auth=auth_cred)
        response_data = response.json()
        
        if response_data and isinstance(response_data, list) and 'ID' in response_data[0]:
            return response_data[0]['ID']
        else:
            raise ValueError("ID not found in response")
    except Exception as e:
        print(e)
        return None  # Return None if there's an error getting the orthanc id
