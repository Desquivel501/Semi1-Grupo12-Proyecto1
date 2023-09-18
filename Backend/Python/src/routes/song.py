from flask import Blueprint
from src.controllers.song import SongController

song_blueprint = Blueprint("blueprint", __name__)

song_blueprint.route("/", methods=["GET"])(SongController.get_songs)
song_blueprint.route("/<int:id>/<email>", methods=["GET"])(SongController.get_song)
song_blueprint.route("/newSong", methods=["POST"])(SongController.create_song)
song_blueprint.route("/<int:id>", methods=["DELETE"])(SongController.delete_song)
song_blueprint.route("/", methods=["PATCH"])(SongController.edit_song)
