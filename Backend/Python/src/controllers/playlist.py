from flask import request
from src.libs.s3client import upload_file
from src.models.playlist import PlaylistModel


class PlaylistController:

    @staticmethod
    def create_playlist():
        body = request.form
        file = request.files
        if len(body) == 0 or len(file) == 0:
            return {"MESSAGE": "Faltan datos", "TYPE": "ERROR"}, 401
        cover_location = upload_file("playlist", file["cover"])
        if cover_location == "":
            return {"MESSAGE": "No se pudo subir la foto", "TYPE": "ERROR"}, 401
        response = PlaylistModel.create_playlist(body, cover_location)
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def get_users_playlists(email):
        response = PlaylistModel.get_users_playlists(email)
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def get_songs(id):
        response = PlaylistModel.get_songs(id)
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def add_song():
        body = request.json
        if "email" not in body or "playlist" not in body or "song" not in body:
            return {"MESSAGE": "Faltan datos", "TYPE": "ERROR"}, 401
        response = PlaylistModel.add_song(body["playlist"], body["song"], body["email"])
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def remove_song():
        body = request.json
        if "email" not in body or "playlist" not in body or "song" not in body:
            return {"MESSAGE": "Faltan datos", "TYPE": "ERROR"}, 401
        response = PlaylistModel.remove_song(
            body["playlist"], body["song"], body["email"]
        )
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def remove_playlist():
        body = request.json
        if "email" not in body or "playlist" not in body:
            return {"MESSAGE": "Faltan datos", "TYPE": "ERROR"}, 401
        response = PlaylistModel.remove_playlist(body["playlist"], body["email"])
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def edit_playlist():
        body = dict(request.form)
        file = request.files
        if len(body) == 0:
            return {"MESSAGE": "Faltan datos", "TYPE": "ERROR"}, 401
        
        cover_location = ""
        if "cover" in file:
            cover_location = upload_file("playlist", file["cover"])
            
        response = PlaylistModel.edit_playlist(body, cover_location)
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def get_song_not_playlist(id):
        response = PlaylistModel.songs_not_playlist(id)
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def get_playlist(id):
        response = PlaylistModel.get_playlist(id)
        return response[0], (200 if response[1] else 400)

