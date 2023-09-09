from flask import Blueprint
from src.controllers.artist import ArtistController

artist_blueprint = Blueprint("blueprint", __name__)

artist_blueprint.route("/")(ArtistController.get_artists)
artist_blueprint.route("/<int:id>", methods=["GET"])(ArtistController.get_artist)
artist_blueprint.route("/newArtist", methods=["POST"])(ArtistController.create_artist)
