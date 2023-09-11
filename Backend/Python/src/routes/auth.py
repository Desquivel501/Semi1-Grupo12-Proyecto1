from flask import Blueprint
from src.controllers.auth import login, logout

Authblueprint = Blueprint("blueprint", __name__)

Authblueprint.route("/login", methods=["POST"])(login)
Authblueprint.route("/logout", methods=["GET"])(logout)
