from flask import Blueprint
from src.controllers.user import UserController

user_blueprint = Blueprint("blueprint", __name__)

user_blueprint.route("/<id>", methods=["GET"])(UserController.get_user)
user_blueprint.route("/newUser", methods=["POST"])(UserController.create_user)
