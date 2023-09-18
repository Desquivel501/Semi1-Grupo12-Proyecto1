from flask import Blueprint
from src.controllers.playlist import PlaylistController

playlist_blueprint = Blueprint("blueprint", __name__)

playlist_blueprint.route("/<email>", methods=["GET"])(PlaylistController.get_users_playlists)
playlist_blueprint.route("/<int:id>/data", methods=["GET"])(PlaylistController.get_playlist)
playlist_blueprint.route("/<int:id>/songs", methods=["GET"])(PlaylistController.get_songs)
playlist_blueprint.route("/<int:id>/missing", methods=["GET"])(PlaylistController.get_song_not_playlist)
playlist_blueprint.route("/newPlaylist", methods=["POST"])( PlaylistController.create_playlist)
playlist_blueprint.route("/addSong", methods=["POST"])(PlaylistController.add_song)
playlist_blueprint.route("/removeSong", methods=["POST"])(PlaylistController.remove_song)
playlist_blueprint.route("/", methods=["PATCH"])(PlaylistController.edit_playlist)
playlist_blueprint.route("/removePlaylist", methods=["POST"])(PlaylistController.remove_playlist)
