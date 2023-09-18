from flask import Blueprint
from src.controllers.report import ReportController

report_blueprint = Blueprint("blueprint", __name__)


report_blueprint.route("/<email>/artists",methods=["GET"])( ReportController.top_artists)
report_blueprint.route("/<email>/albums",methods=["GET"])( ReportController.top_albums)
report_blueprint.route("/<email>/songs",methods=["GET"])( ReportController.top_songs)
report_blueprint.route("/addHistory",methods=["POST"])( ReportController.add_history)
