from src.models.database.connection import getCnx
from src.libs.crypto import encrypt
from src.utils.formatDate import formatDate


class UserModel:

    @staticmethod
    def create_user(user, avatar_filename):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            birth_date = formatDate(user["birthDate"])
            # crypto
            password = encrypt(user["password"])
            print(password)
            # Query
            cursor.callproc(
                "Register",
                (
                    user["email"],
                    user["name"],
                    user["lastname"],
                    avatar_filename,
                    password,
                    birth_date,
                ),
            )
            db.commit()
            for result in cursor.stored_results():
                result = dict(zip(result.column_names, result.fetchone()))
                if result["TYPE"] == "ERROR":
                    cursor.close()
                    return result, False
                else:
                    cursor.close()
                    return result, True
        except Exception as e:
            cursor.close()
            return str(e), False

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
                cursor.close()
                return response, True
            else:
                cursor.close()
                return {"MESSAGE": "Usuario no encontrado", "TYPE": "ERROR"}, False
        except Exception as e:
            cursor.close()
            return str(e), False

    @staticmethod
    def edit_user(user, avatar_filename):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            birth_date = formatDate(user["birthDate"])
            # crypto
            password = encrypt(user["password"])
            # Query
            cursor.callproc(
                "UpdateUser",
                (
                    user["email"],
                    user["newEmail"],
                    user["name"],
                    user["lastname"],
                    avatar_filename,
                    password,
                    birth_date,
                ),
            )
            db.commit()
            for result in cursor.stored_results():
                result = dict(zip(result.column_names, result.fetchone()))
                if result["TYPE"] == "ERROR":
                    cursor.close()
                    return result, False
                else:
                    cursor.close()
                    return result, True
        except Exception as e:
            cursor.close()
            return str(e), False

    @staticmethod
    def add_to_favorite(song, email):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "AddToFavorites",
                (
                    song,
                    email,
                ),
            )
            db.commit()
            for result in cursor.stored_results():
                result = dict(zip(result.column_names, result.fetchone()))
                if result["TYPE"] == "ERROR":
                    cursor.close()
                    return result, False
                else:
                    cursor.close()
                    return result, True
        except Exception as e:
            cursor.close()
            return str(e), False

    @staticmethod
    def get_favorites(email):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "GetSongsInFavorites",
                (email,),
            )
            data = []
            for result in cursor.stored_results():
                for song in result.fetchall():
                    result = dict(
                        zip(("id", "name", "singer", "cover", "musicSrc"), song)
                    )
                    data.append(result)
            cursor.close()
            return data, True
        except Exception as e:
            cursor.close()
            return str(e), False

    @staticmethod
    def get_history(email):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "GetHistory",
                (email,),
            )
            data = []
            for result in cursor.stored_results():
                for song in result.fetchall():
                    result = dict(
                        zip(("cancion", "artista", "album"), song)
                    )
                    data.append(result)
            cursor.close()
            return data, True
        except Exception as e:
            cursor.close()
            return str(e), False
