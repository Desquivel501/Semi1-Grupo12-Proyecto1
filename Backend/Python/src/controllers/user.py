from flask import request
from src.libs.s3client import upload_file
from src.models.user import UserModel


class UserController:

    @staticmethod
    def create_user():
        user = dict(request.form)
        files = request.files
        if len(user) == 0 or len(files) == 0:
            return {"MESSAGE": "Faltan datos"}, 400
        user["avatar"] = upload_file("user", files["avatar"])
        for value in user:
            if user[value] == "":
                return {"MESSAGE": "Faltan datos"}, 400
        # Guardar en db
        response = UserModel.create_user(user, user["avatar"])

        return response[0], (200 if response[1] else 400)

    @staticmethod
    def get_user(id):
        response = UserModel.get_user(id)
        return response[0], (200 if response[1] else 400)
