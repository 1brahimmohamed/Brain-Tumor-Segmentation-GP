from models.NiftiFile import NiftiFile

class RetrieveService:

    def __init__(self):
        pass

    def get_file_by_file_id(self, file_id):
        return NiftiFile.query.filter_by(id=file_id).all()
    
