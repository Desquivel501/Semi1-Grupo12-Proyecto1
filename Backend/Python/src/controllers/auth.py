from flask import request
from src.models.auth import login as Login


def login():
    body = request.json
    email = body["email"]
    pwd = body["password"]
    if not email or not pwd:
        return {"MESSAGE": "Not Welcome"}
    response = Login(email, pwd)
    return response, response["status"]


def logout():
    return {"MESSAGE": "Bye"}
