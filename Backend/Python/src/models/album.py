from src.models.database.connection import getCnx


class AlbumModel:

    @staticmethod
    def create_album(album, cover_filename):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "CreateAlbum",
                (
                    album["name"],
                    album["description"],
                    cover_filename,
                    int(album["artist"]),
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
    def get_album(id):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Ejecuta la consulta SQL para obtener el usuario por su email
            cursor.execute(
                """SELECT al.id_album AS id, al.name AS name,a.name as singer,al.image as cover FROM Albums al
                    JOIN Artists a ON al.id_artist=a.id_artist
                    WHERE al.id_album={id}""".format(
                    id=id
                ),
            )
            result = cursor.fetchone()
            if result is not None and len(result) > 0:
                # Convierte el resultado en un diccionario y lo devuelve
                response = dict(zip(cursor.column_names, result))
                return response, True
            else:
                return {"MESSAGE": "Album no encontrado", "TYPE": "ERROR"}, False
        except Exception as e:
            return str(e), False
        finally:
            cursor.close()

    @staticmethod
    def get_albums():
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Ejecuta la consulta SQL para obtener el usuario por su email
            cursor.execute(
                """SELECT al.id_album AS id, al.name AS name,a.name as singer,al.image as cover FROM Albums al
                    JOIN Artists a ON al.id_artist=a.id_artist"""
            )
            result = cursor.fetchall()
            # Convierte el resultado en un diccionario y lo devuelve
            response = []
            for obj in result:
                album = dict(zip(cursor.column_names, obj))
                response.append(album)
            return response, True
        except Exception as e:
            return str(e), False
        finally:
            cursor.close()

    @staticmethod
    def get_songs(id):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Ejecuta la consulta SQL para obtener el usuario por su email
            cursor.execute(
                f"""SELECT s.name, ar.name as singer, s.image AS cover, s.file AS musicSrc FROM Albums_details ad
        JOIN Songs s ON ad.id_song=s.id_song
        JOIN Artists ar ON s.id_artist=ar.id_artist
        WHERE ad.id_album={int(id)}""",
            )
            result = cursor.fetchall()
            # Convierte el resultado en un diccionario y lo devuelve
            response = []
            for obj in result:
                album = dict(zip(cursor.column_names, obj))
                response.append(album)
            return response, True
        except Exception as e:
            return str(e), False
        finally:
            cursor.close()

    @staticmethod
    def add_song(id_album, id_song):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "AddSongAlbum",
                (int(id_album), int(id_song)),
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
    def delete_album(id_album):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "DeleteAlbum",
                (int(id_album),),
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
