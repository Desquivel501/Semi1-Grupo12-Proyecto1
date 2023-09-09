from flask import request
from src.libs.s3client import upload_file
from src.models.song import SongModel


class SongController:

    @staticmethod
    def create_song():
        body = request.form
        file = request.files
        if len(body) == 0 or len(file) == 0:
            return {"MESSAGE": "Faltan datos", "TYPE": "ERROR"}, 401
        cover_location = upload_file("song", file["cover"])
        if cover_location == "":
            return {"MESSAGE": "No se pudo subir la foto", "TYPE": "ERROR"}, 401
        sourcer_location = upload_file("song", file["source"], False)
        if sourcer_location == "":
            return {"MESSAGE": "No se pudo subir la canción", "TYPE": "ERROR"}, 401
        response = SongModel.create_song(body, cover_location, sourcer_location)
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def get_song(id):
        response = SongModel.get_song(id)
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def get_songs():
        response = SongModel.get_songs()
        return response[0], (200 if response[1] else 400)
