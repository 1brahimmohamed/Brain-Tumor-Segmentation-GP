from pydicom import Dataset
import json

def extract_studies_metadata(studies_metadata):
    extracted_metadata = []

    for study_metadata in studies_metadata:
        main_dicom_tags = study_metadata['MainDicomTags']
        patient_main_dicom_tags = study_metadata['PatientMainDicomTags']
        extracted_metadata.append({
            'studyInstanceUid': main_dicom_tags.get('StudyInstanceUID', ''),
            'studyDate': main_dicom_tags.get('StudyDate', ''),
            'studyId': main_dicom_tags.get('StudyID', ''),
            'studyTime': main_dicom_tags.get('StudyTime', ''),
            'studyDescription': main_dicom_tags.get('StudyDescription', ''),
            'accessionNumber': main_dicom_tags.get('AccessionNumber', ''),
            'institutionName': main_dicom_tags.get('InstitutionName', ''),
            'patientId': patient_main_dicom_tags.get('PatientID', ''),
            'patientName': patient_main_dicom_tags.get('PatientName', '')
        })

    return extracted_metadata


def extract_study_metadata(study):
    series_related_data = []
    series_datasets = []
    total_instances = 0

    for series in study:
        # make a dataset from json
        dataset = Dataset().from_json(series)
        series_datasets.append(dataset)

        # get the total number of instances
        total_instances += dataset.get((0x0020, 0x1209)).value

        # append the series data
        series_related_data.append({
                    'studyInstanceUid': getattr(dataset, 'StudyInstanceUID', ''),
                    'seriesModality': getattr(dataset, 'Modality', ''),
                    'seriesDescription': getattr(dataset, 'SeriesDescription', ''),
                    'seriesNumber': getattr(dataset, 'SeriesNumber', ''),
                    'seriesId': getattr(dataset, 'SeriesInstanceUID', ''),
                    'seriesInstanceUid': getattr(dataset, 'SeriesInstanceUID', ''),
                    'seriesNumber': getattr(dataset, 'SeriesNumber', ''),
                    'numberOfInstances': dataset.get((0x0020, 0x1209)).value,
                    'retrieveUrl': getattr(dataset, 'RetrieveURL', ''),
        })


        # append the study data + patient data to the object
        study_data = {
            'patientName': str(getattr(dataset, 'PatientName', '')),
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
