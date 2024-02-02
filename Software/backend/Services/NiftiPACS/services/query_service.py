from models.NiftiFile import NiftiFile


class QueryService:

    def __init__(self):
        pass

    def get_all_files(self):
        return NiftiFile.query.filter_by().all()

    def get_all_files_by_patient_id(self, patient_id):
        return NiftiFile.query.filter_by(patient_id=patient_id).all()

    def get_all_files_by_patient_name(self, patient_name):
        return NiftiFile.query.filter_by(patient_name=patient_name).all()

    def get_all_files_by_sex(self, sex):
        return NiftiFile.query.filter_by(sex=sex).all()
