# from flask import Blueprint, request
# from services.store_service import StoreService
#
# store_service = StoreService()
#
# def store():
#     if 'file' not in request.files:
#         return {
#             "status": "error",
#             "message": "No file part"
#         }, 400
#
#     file = request.files['file']
#
#     if file.filename == '':
#         return {
#             "status": "error",
#             "message": "No selected file"
#         }, 400
#
#     if file and not check_is_nifti(file):
#         return {
#             "status": "error",
#             "message": "Invalid file type, we only accept Nifti files"
#         }, 400
#
#     StoreService.store(store_service, file, request.form['patient_id'], request.form['modality'])
#
#     return {
#         "status": "success",
#         "message": "File stored"
#     }, 201
#
#
# def check_is_nifti(file):
#     allowed_extensions = {'.nii', '.nii.gz'}  # Define the allowed NIfTI file extensions
#     # Check if the file extension is in the set of allowed NIfTI extensions
#     return any(file.filename.lower().endswith(ext) for ext in allowed_extensions)
