from flask import request
from src.libs.s3client import upload_file
from src.models.album import AlbumModel


class AlbumController:

    @staticmethod
    def create_album():
        body = request.form
        file = request.files
        if len(body) == 0 or len(file) == 0:
            return {"MESSAGE": "Faltan datos", "TYPE": "ERROR"}, 401
        cover_location = upload_file("album", file["cover"])
        if cover_location == "":
            return {"MESSAGE": "No se pudo subir la foto", "TYPE": "ERROR"}, 401
        response = AlbumModel.create_album(body, cover_location)
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def get_album(id):
        response = AlbumModel.get_album(id)
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def get_albums():
        response = AlbumModel.get_albums()
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def get_songs(id):
        response = AlbumModel.get_songs(id)
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def add_song():
        body = request.json
        if not body or "id_song" not in body or "id_album" not in body:
            return {"MESSAGE": "Faltan datos", "TYPE": "ERROR"}, 401
        id_album = body["id_album"]
        id_song = body["id_song"]
        response = AlbumModel.add_song(id_album, id_song)
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def delete_album(id):
        response = AlbumModel.delete_album(id)
        return response[0], (200 if response[1] else 400)

    def edit_album():
        album = dict(request.form)
        files = request.files
        if len(album) == 0 or len(files) == 0:
            return {"MESSAGE": "Faltan datos"}, 400
        for value in album:
            if album[value] == "":
                return {"MESSAGE": "Faltan datos"}, 400
        album["cover"] = upload_file("album", files["cover"])
        # Guardar en db
        response = AlbumModel.edit_album(album, album["cover"])
        return response[0], (200 if response[1] else 400)
