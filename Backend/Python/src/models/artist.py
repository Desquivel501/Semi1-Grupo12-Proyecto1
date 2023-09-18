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
            db.commit()
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
            # Query
            cursor.callproc(
                "GetAllArtists",
            )
            data = []
            for result in cursor.stored_results():
                for song in result.fetchall():
                    result = dict(zip(("id", "name", "cover"), song))
                    data.append(result)
            return data, True
        except Exception as e:
            return str(e), False
        finally:
            cursor.close()


    @staticmethod
    def get_songs(artist):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "GetArtistSongs",
                (artist,),
            )
            data = []
            for result in cursor.stored_results():
                for song in result.fetchall():
                    result = dict(zip(("id", "name", "cover", "musicSrc"), song))
                    data.append(result)
            return data, True
        except Exception as e:
            return str(e), False
        finally:
            cursor.close()

    @staticmethod
    def edit_artist(artist, avatar_filename):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            birth_date = formatDate(artist["birthDate"])
            # crypto
            # Query
            cursor.callproc(
                "UpdateArtist",
                (
                    artist["id"],
                    artist["name"],
                    avatar_filename,
                    birth_date,
                ),
            )
            db.commit()
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
    def delete_artist(id):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "DeleteArtist",
                (id,),
            )
            db.commit()
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
    def song_not_album(id):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc("GetArtistSongsNotInAlbum", (id,))
            data = []
            for result in cursor.stored_results():
                for song in result.fetchall():
                    result = dict(
                        zip(("id", "name", "cover", "musicSrc", "album"), song)
                    )
                    data.append(result)
            return data, True
        except Exception as e:
            return str(e), False
        finally:
            cursor.close()
