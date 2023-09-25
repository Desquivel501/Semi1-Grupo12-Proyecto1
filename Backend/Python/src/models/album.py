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
                cursor.close()
                return response, True
            else:
                cursor.close()
                return {"MESSAGE": "Album no encontrado", "TYPE": "ERROR"}, False
        except Exception as e:
            cursor.close()
            return str(e), False

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
            cursor.close()
            return response, True
        except Exception as e:
            cursor.close()
            return str(e), False

    @staticmethod
    def get_songs(id):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "GetAlbumSongs", 
                (int(id),),
            )
            data = []
            for result in cursor.stored_results():
                for song in result.fetchall():
                    result = dict(zip(("id", "name", "cover", "musicSrc"), song))
                    data.append(result)
            cursor.close()
            return data, True
        except Exception as e:
            print(e)
            cursor.close()
            return str(e), False

    @staticmethod
    def add_song(id_album, id_song):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "AddSongAlbum",
                (int(id_song), int(id_album)),
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
    def remove_song(id_album, id_song):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "RemoveSongAlbum",
                (int(id_song), int(id_album)),
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
    def delete_album(id_album):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "DeleteAlbum",
                (int(id_album),),
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
    def edit_album(album, cover_filename):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "UpdateAlbum",
                (
                    album["id"],
                    album["name"],
                    album["description"],
                    cover_filename,
                    album["artist"],
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
