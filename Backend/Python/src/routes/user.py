from flask import Blueprint
from src.controllers.user import UserController
from src.controllers.playlist import PlaylistController

user_blueprint = Blueprint("blueprint", __name__)

user_blueprint.route("/<id>", methods=["GET"])(UserController.get_user)
user_blueprint.route("/", methods=["PATCH"])(UserController.edit_user)
user_blueprint.route("/newUser", methods=["POST"])(UserController.create_user)

user_blueprint.route("/<email>/playlists", methods=["GET"])(PlaylistController.get_users_playlists)
user_blueprint.route("/playlists/<int:id>/songs", methods=["GET"])(PlaylistController.get_songs)
user_blueprint.route("/newPlaylist", methods=["POST"])( PlaylistController.create_playlist)
user_blueprint.route("/playlists/addSong", methods=["POST"])(PlaylistController.add_song)
user_blueprint.route("/playlists/removeSong", methods=["POST"])(PlaylistController.remove_song)
user_blueprint.route("/removePlaylist", methods=["POST"])(PlaylistController.remove_playlist)
