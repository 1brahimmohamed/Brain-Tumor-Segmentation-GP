from flask import Flask, request, jsonify
import nibabel as nib
import numpy as np
from flask_cors import CORS
from io import BytesIO
import json


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/", methods=["POST"])
def receive_segmentation():
    try:
        # Get segmentation data from the request
        data = request.get_json()
        # Access the content within the 'data' key
        data_content = data.get('data')


        nifti_header = data_content.get("niftiHeader")
        
        scalar_data = np.array(list(map(int, data_content.get("scalarData"))))
        X, Y, Z = 192, 256, 256
        # Reshape the 1D array into a 3D array
        three_d_array = scalar_data.reshape((X, Y, Z))

        print(three_d_array)
        # Convert to NIfTI format
        nifti_img = convert_to_nifti(nifti_header, three_d_array)

        nib.save(nifti_img, 'segmentation.nii.gz')


        return jsonify({"success": True})
    except Exception as e:
        return jsonify({"error": str(e)})


def convert_to_nifti(header, scalar_data):
    
    nifti_img = nib.Nifti1Image(scalar_data, affine=header.get("affine"))

    return nifti_img
if __name__ == "__main__":
    app.run(debug=True)