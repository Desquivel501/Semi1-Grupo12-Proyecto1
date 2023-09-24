from flask import request
from src.models.auth import login as Login
from src.libs.jwt import getToken, checkToken


def login():
    body = request.json
    email = body["email"]
    pwd = body["password"]
    if not email or not pwd:
        return {"MESSAGE": "Not Welcome"}
    response = Login(email, pwd)
    if response["status"] >= 400:
        response["token"] = ""
        return response, response["status"]
    token = getToken({"email": email, "response": response})
    response["token"] = token
    return response, response["status"]


def logout():
    token = request.authorization
    decoded = checkToken(token.token)
    print(decoded)
    return {"MESSAGE": "ADIÓS"}, 200
