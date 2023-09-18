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

    @staticmethod
    def edit_user():
        user = dict(request.form)
        files = request.files
        if len(user) == 0 or len(files) == 0:
            return {"MESSAGE": "Faltan datos"}, 400
        for value in user:
            if user[value] == "":
                return {"MESSAGE": "Faltan datos"}, 400
        user["avatar"] = upload_file("user", files["avatar"])
        # Guardar en db
        response = UserModel.edit_user(user, user["avatar"])
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def add_to_favorite():
        song = request.json
        if "email" not in song or "song" not in song:
            return {"MESSAGE": "Faltan datos"}, 400
        # Guardar en db
        response = UserModel.add_to_favorite(song["song"], song["email"])
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def get_favorites(email):
        if email == "":
            return {"MESSAGE": "Falta el correo"}, 400
        # Guardar en db
        response = UserModel.get_favorites(email)
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def get_history(email):
        if email == "":
            return {"MESSAGE": "Falta el correo"}, 400
        # Guardar en db
        response = UserModel.get_history(email)
        return response[0], (200 if response[1] else 400)
