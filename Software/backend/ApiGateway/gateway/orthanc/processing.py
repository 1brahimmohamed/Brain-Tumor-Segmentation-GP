from pydicom import Dataset


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
