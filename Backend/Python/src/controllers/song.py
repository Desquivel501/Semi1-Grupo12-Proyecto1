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
    def get_song(id, email):
        response = SongModel.get_song(id, email)
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def get_songs():
        response = SongModel.get_songs()
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def delete_song(id):
        response = SongModel.delete_song(id)
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def edit_song():
        song = dict(request.form)
        files = request.files
        if len(song) == 0 or len(files) == 0:
            return {"MESSAGE": "Faltan datos"}, 400
        cover_location = upload_file("song", files["cover"])
        sourcer_location = upload_file("song", files["source"], False)
        # Guardar en db
        response = SongModel.edit_song(song, cover_location, sourcer_location)
        return response[0], (200 if response[1] else 400)
