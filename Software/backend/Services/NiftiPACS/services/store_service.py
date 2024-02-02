# import nibabel as nib
# from models.Patient import Patient
#
# class StoreService:
#
#     def store(self, file, patient_id=None, modality=None):
#         # check if patient exists
#
#         if patient_id is None:
#             patient_id = file.filename.split('_')[0]
#
#         patient = Patient.query.filter_by(id=patient_id).first()
#
#         if patient is None:
#             # create patient
#             patient = Patient()
#             patient.id = patient_id
#             patient.name = patient_id
#
#             # add patient to database
#             db.session.add(patient)
#             db.session.commit()
#
#         # create nifti file
#         nifti_file = NiftiFile()
#         nifti_file.name = file.filename
#         nifti_file.path = file.filename
#         nifti_file.size = file.content_length
#         nifti_file.patient_id = patient_id
#         nifti_file.modality = modality
#
#         # add nifti file to database
#         db.session.add(nifti_file)
#         db.session.commit()
#
#         # save nifti file
#         file.save(os.path.join(f"{app.config['UPLOAD_FOLDER']}/{patient_id}", file.filename))
#
#         # return nifti file
#         return nifti_file.serialize
#
#
#
