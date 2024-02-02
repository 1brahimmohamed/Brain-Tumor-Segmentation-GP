import os
from flask import Flask
from db import db
# from routes.user_routes import user_routes
from routes.file_routes import file_routes
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['UPLOAD_FOLDER'] = os.environ.get('UPLOAD_FOLDER')
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100 MB limit


db.init_app(app)

# app.register_blueprint(user_routes, url_prefix='/user')
app.register_blueprint(file_routes, url_prefix='/nifti-web/files')

if __name__ == '__main__':
    app.debug = True
    app.run()