from flask import request
from src.libs.s3client import upload_file
from src.models.artist import ArtistModel


class ArtistController:

    @staticmethod
    def create_artist():
        body = request.form
        file = request.files
        if len(body) == 0 or len(file) == 0:
            return {"MESSAGE": "Faltan datos", "TYPE": "ERROR"}, 401
        location = upload_file("artist", file["avatar"])
        if location == "":
            return {"MESSAGE": "No se pudo subir la foto", "TYPE": "ERROR"}, 401
        response = ArtistModel.create_artist(body, location)
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def get_artist(id):
        response = ArtistModel.get_artist(id)
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def get_artists():
        response = ArtistModel.get_artists()
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def get_songs(id):
        response = ArtistModel.get_songs(id)
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def delete_artist(id):
        response = ArtistModel.delete_artist(id)
        return response[0], (200 if response[1] else 400)
