from src.models.database.connection import getCnx


class SongModel:

    @staticmethod
    def create_song(song, cover_filename, source_filename):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "CreateSong",
                (
                    song["name"],
                    cover_filename,
                    int(song["duration"]),
                    int(song["artist"]),
                    source_filename,
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
    def get_song(id):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Ejecuta la consulta SQL para obtener el usuario por su email
            cursor.execute(
                f"""SELECT s.name as name,a.name as singer,s.image as cover, s.file as musicSrc FROM Songs s  
                    JOIN Song_artists sa ON s.id_song=sa.id_song
                    JOIN Artists a ON sa.id_artist=a.id_artist
                    WHERE s.id_song={int(id)}"""
            )
            result = cursor.fetchone()
            if result is not None and len(result) > 0:
                # Convierte el resultado en un diccionario y lo devuelve
                response = dict(zip(cursor.column_names, result))
                return response, True
            else:
                return {"MESSAGE": "Canción no encontrada", "TYPE": "ERROR"}, False
        except Exception as e:
            return str(e), False
        finally:
            cursor.close()

    @staticmethod
    def get_songs():
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Ejecuta la consulta SQL para obtener el usuario por su email
            cursor.execute(
                """SELECT s.name as name,a.name as singer,s.image as cover, s.file as musicSrc FROM Songs s  
                    JOIN Song_artists sa ON s.id_song=sa.id_song
                    JOIN Artists a ON sa.id_artist=a.id_artist"""
            )
            result = cursor.fetchall()
            # Convierte el resultado en un diccionario y lo devuelve
            response = []
            for obj in result:
                song = dict(zip(cursor.column_names, obj))
                response.append(song)
            return response, True
        except Exception as e:
            return str(e), False
        finally:
            cursor.close()

    @staticmethod
    def delete_song(id_song):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "DeleteSong",
                (
                    int(id_song),
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
