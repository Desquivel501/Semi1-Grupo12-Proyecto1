import jwt
from datetime import datetime, timezone, timedelta
from decouple import config


def getToken(data):
    data["exp"] = datetime.now(timezone.utc) + timedelta(hours=10)
    token = jwt.encode(
        # data.update({"exp": datetime.now(timezone.utc) + timedelta(hours=10)}),
        data,
        config("JWT_KEY"),
        algorithm="HS256",
    )
    print(token)
    return token


def checkToken(token):
    try:
        decode = jwt.decode(token, config("JWT_KEY"), algorithms=["HS256"])
        return decode
    except Exception as e:
        print(e)
        return ""
