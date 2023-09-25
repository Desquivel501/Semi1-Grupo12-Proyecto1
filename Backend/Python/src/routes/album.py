from flask import Blueprint
from src.controllers.album import AlbumController

album_blueprint = Blueprint("blueprint", __name__)

album_blueprint.route("/", methods=["GET"])(AlbumController.get_albums)
album_blueprint.route("/<int:id>/", methods=["GET"])(AlbumController.get_album)
album_blueprint.route("/<int:id>/songs/", methods=["GET"])(AlbumController.get_songs)
album_blueprint.route("/newAlbum", methods=["POST"])(AlbumController.create_album)
album_blueprint.route("/addSong", methods=["POST"])(AlbumController.add_song)
album_blueprint.route("/removeSong", methods=["POST"])(AlbumController.remove_song)
album_blueprint.route("/<int:id>", methods=["DELETE"])(AlbumController.delete_album)
album_blueprint.route("/", methods=["PATCH"])(AlbumController.edit_album)
