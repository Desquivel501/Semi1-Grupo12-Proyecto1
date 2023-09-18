from flask import Blueprint
from src.controllers.artist import ArtistController

artist_blueprint = Blueprint("blueprint", __name__)

artist_blueprint.route("/", methods=["GET"])(ArtistController.get_artists)
artist_blueprint.route("/<int:id>", methods=["GET"])(ArtistController.get_artist)
artist_blueprint.route("/<int:id>/songs", methods=["GET"])(ArtistController.get_songs)
artist_blueprint.route("/<int:id>/songs/notInAlbum", methods=["GET"])(ArtistController.song_not_album)
artist_blueprint.route("/newArtist", methods=["POST"])(ArtistController.create_artist)
artist_blueprint.route("/", methods=["PATCH"])(ArtistController.edit_artist)
artist_blueprint.route("/<int:id>", methods=["DELETE"])(ArtistController.delete_artist)
