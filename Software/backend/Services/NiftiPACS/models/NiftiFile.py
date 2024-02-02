from . import db
from sqlalchemy.sql import func


class NiftiFile(db.Model):
    __tablename__ = 'NiftiFiles'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    path = db.Column(db.String(120), unique=True, nullable=False)
    size = db.Column(db.Integer)
    sop_instance_uid = db.Column(db.String(120), unique=True, nullable=False)
    modality = db.Column(db.String(120), nullable=False)
    patient_id = db.Column(db.Integer, db.ForeignKey('Patients.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    def __repr__(self):
        return f'{self.name} - {self.path} - {self.size}'

    @property
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'path': self.path,
            'size': self.size,
            'patient_id': self.patient_id
        }
