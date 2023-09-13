from src.models.database.connection import getCnx
from src.libs.crypto import encrypt


def login(email, password):
    cnx = getCnx()
    cursor = cnx.cursor(buffered=True)
    query = "CALL Login(%s,%s)"
    pwd = encrypt(password)
    print(pwd)
    cursor.execute(query, (email, pwd))
    response = dict(zip(cursor.column_names, cursor.fetchone()))
    response["status"] = 200
    if response["TYPE"] == "ERROR":
        response["status"] = 400
    cursor.close()
    return response
