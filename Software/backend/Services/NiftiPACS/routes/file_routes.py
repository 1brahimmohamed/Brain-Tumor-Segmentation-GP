from flask import Blueprint
from controllers.file_mangment_controller import upload_file, get_nifti_file, get_nifti_case

file_routes = Blueprint('file_routes', __name__)


file_routes.route('/', methods=['POST'])(upload_file)
file_routes.route('/<string:file_id>/file', methods=['GET'])(get_nifti_file)
file_routes.route('/cases/<string:case_id>/', methods=['GET'])(get_nifti_case)