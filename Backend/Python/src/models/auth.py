from src.models.database.connection import getCnx


def login(email, password):
    cnx = getCnx()
    cursor = cnx.cursor(buffered=True)
    query = "CALL Login(%s,%s)"
    cursor.execute(query, (email, password))
    response = dict(zip(cursor.column_names, cursor.fetchone()))
    response["status"] = 200
    if response["TYPE"] == "ERROR":
        response["status"] = 400
    cursor.close()
    return response
