from src.models.database.connection import getCnx
from src.utils.formatDate import formatDate


class ArtistModel:

    @staticmethod
    def create_artist(artist, avatar_filename):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            birth_date = formatDate(artist["birthDate"])
            # Query
            cursor.callproc(
                "CreateArtist",
                (
                    artist["name"],
                    avatar_filename,
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
    def get_artist(id):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Ejecuta la consulta SQL para obtener el usuario por su email
            cursor.execute(
                f"SELECT a.id_artist AS id, a.name,a.image AS cover,a.birthdate  FROM Artists a WHERE a.id_artist='{id}'"
            )
            result = cursor.fetchone()
            if result is not None and len(result) > 0:
                # Convierte el resultado en un diccionario y lo devuelve
                response = dict(zip(cursor.column_names, result))
                return response, True
            else:
                return {"MESSAGE": "Artista no encontrado", "TYPE": "ERROR"}, False
        except Exception as e:
            return str(e), False
        finally:
            cursor.close()

    @staticmethod
    def get_artists():
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Ejecuta la consulta SQL para obtener el usuario por su email
            cursor.execute(
                "SELECT a.id_artist AS id, a.name,a.image AS cover,a.birthdate  FROM Artists a"
            )
            result = cursor.fetchall()
            # Convierte el resultado en un diccionario y lo devuelve
            response = []
            for obj in result:
                artist = dict(zip(cursor.column_names, obj))
                response.append(artist)
            return response, True
        except Exception as e:
            return str(e), False
        finally:
            cursor.close()
