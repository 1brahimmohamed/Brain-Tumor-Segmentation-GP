from models.Patient import Patient
from db import db


class UserService:
    def create_user(self, name, email):
        user = Patient(name=name, email=email)
        db.session.add(user)
        db.session.commit()
        return user

    def get_user(self, user_id):
        return Patient.query.get(user_id)

    def update_user(self, user_id, name, email):
        user = Patient.query.get(user_id)
        if user:
            user.name = name
            user.email = email
            db.session.commit()
        return user

    def delete_user(self, user_id):
        user = Patient.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
        return user
