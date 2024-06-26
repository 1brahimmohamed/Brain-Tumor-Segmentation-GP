from pydicom import Dataset
import pydicom
import json

studies_dic = {}


def clean_patient_name(patient_name):
    if patient_name:
        return patient_name.replace("^", " ")
    return ''


def extract_studies_metadata(studies_metadata_arr, first_series_metadata_arr):
    extracted_metadata = []

    for i, study_metadata, in enumerate(studies_metadata_arr):
        main_dicom_tags = study_metadata['MainDicomTags']
        patient_main_dicom_tags = study_metadata['PatientMainDicomTags']
        studies_dic[main_dicom_tags.get('StudyInstanceUID', '')] = study_metadata.get('ID', '')
        extracted_metadata.append({
            'studyInstanceUid': main_dicom_tags.get('StudyInstanceUID', ''),
            'studyDate': main_dicom_tags.get('StudyDate', ''),
            'studyOrthancId': study_metadata.get('ID', ''),
            'studyId': main_dicom_tags.get('StudyID', ''),
            'studyTime': main_dicom_tags.get('StudyTime', ''),
            'studyDescription': main_dicom_tags.get('StudyDescription', ''),
            'accessionNumber': main_dicom_tags.get('AccessionNumber', ''),
            'institutionName': main_dicom_tags.get('InstitutionName', ''),
            'patientId': patient_main_dicom_tags.get('PatientID', ''),
            'patientName': clean_patient_name(patient_main_dicom_tags.get('PatientName', '')),
            'modality': first_series_metadata_arr[i]["MainDicomTags"].get('Modality', ''),
        })

    return extracted_metadata


def extract_study_metadata(study):
    series_related_data = []
    series_datasets = []
    total_instances = 0

    for series in study:
        # make a dataset from json
        dataset = Dataset().from_json(series)

        if getattr(dataset, 'Modality', '') in ['SR', 'PR']:
            continue

        series_datasets.append(dataset)

        # get the total number of instances
        total_instances += dataset.get((0x0020, 0x1209)).value

        # append the series data
        series_related_data.append({
            'studyInstanceUid': getattr(dataset, 'StudyInstanceUID', ''),
            'studyOrthancId': studies_dic.get(getattr(dataset, 'StudyInstanceUID', ''), ''),
            'seriesModality': getattr(dataset, 'Modality', ''),
            'seriesDescription': getattr(dataset, 'SeriesDescription', ''),
            'seriesNumber': getattr(dataset, 'SeriesNumber', ''),
            'seriesId': getattr(dataset, 'SeriesInstanceUID', ''),
            'seriesInstanceUid': getattr(dataset, 'SeriesInstanceUID', ''),
            'numberOfInstances': dataset.get((0x0020, 0x1209)).value,
            'retrieveUrl': getattr(dataset, 'RetrieveURL', ''),
        })

        # append the study data + patient data to the object
        study_data = {
            'patientName': clean_patient_name(str(getattr(series_datasets[0], 'PatientName', ''))),
            'patientId': getattr(series_datasets[0], 'PatientID', ''),
            'patientBirthDate': getattr(series_datasets[0], 'PatientBirthDate', ''),
            'patientSex': getattr(series_datasets[0], 'PatientSex', ''),
            'studyDate': getattr(series_datasets[0], 'StudyDate', ''),
            'studyTime': getattr(series_datasets[0], 'StudyTime', ''),
            'studyInstanceUid': getattr(series_datasets[0], 'StudyInstanceUID', ''),
            'studyTotalInstances': total_instances,
            'modality': getattr(series_datasets[0], 'Modality', ''),
            "series": series_related_data,
        }

    return study_data


def check_is_dicom(file):
    """
    Check if the uploaded file is a DICOM file
    :param file: uploaded file
    :return: boolean
    """
    # try open the file
    try:
        pydicom.dcmread(file)
    except:
        return False
    return True
