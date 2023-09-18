from flask import request
from src.models.report import ReportModel


class ReportController:

    @staticmethod
    def add_history():
        body = request.json
        if "email" not in body or "song" not in body:
            return {"MESSAGE": "Faltan datos", "TYPE": "ERROR"}, 401
        response = ReportModel.add_history(body["song"], body["email"])
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def top_songs(email):
        response = ReportModel.top_songs(email)
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def top_artists(email):
        response = ReportModel.top_artists(email)
        return response[0], (200 if response[1] else 400)

    @staticmethod
    def top_albums(email):
        response = ReportModel.top_albums(email)
        return response[0], (200 if response[1] else 400)
