from src.models.database.connection import getCnx
from src.utils.formatDate import formatDate


class UserModel:

    @staticmethod
    def create_user(user, avatar_filename):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            birth_date = formatDate(user["birthDate"])
            # Query
            cursor.callproc(
                "Register",
                (
                    user["email"],
                    user["name"],
                    user["lastname"],
                    avatar_filename,
                    user["password"],
                    birth_date,
                ),
            )
            for result in cursor.stored_results():
                result = dict(zip(result.column_names, result.fetchone()))
                if result["TYPE"] == "ERROR":
                    return result, False
                else:
                    return result, True
        except Exception as e:
            return str(e), False
        finally:
            cursor.close()

    @staticmethod
    def get_user(email):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)

            # Ejecuta la consulta SQL para obtener el usuario por su email
            cursor.execute(f"SELECT * FROM Users WHERE email='{email}'")
            result = cursor.fetchone()
            if len(result) > 0:
                # Convierte el resultado en un diccionario y lo devuelve
                response = dict(zip(cursor.column_names, result))
                return response, True
            else:
                return {"MESSAGE": "Usuario no encontrado", "TYPE": "ERROR"}, False
        except Exception as e:
            return str(e), False
        finally:
            cursor.close()
