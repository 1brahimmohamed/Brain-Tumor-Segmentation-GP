from db import db


class Patient(db.Model):
    __tablename__ = 'Patients'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    nifti_files = db.Column(db.ARRAY(db.Integer), db.foreignKey('NiftiFiles.id'))
    sex = db.Column(db.String)

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'sex': self.sex,
            'nifti_files': self.nifti_files
        }
