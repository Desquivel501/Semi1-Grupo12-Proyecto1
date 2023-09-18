from src.models.database.connection import getCnx


class PlaylistModel:

    @staticmethod
    def create_playlist(playlist, cover_filename):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "CreatePlaylist",
                (
                    playlist["name"],
                    playlist["description"],
                    cover_filename,
                    playlist["email"],
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
    def get_users_playlists(email):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "GetUserPlaylists",
                (email,),
            )
            data = []
            for result in cursor.stored_results():
                for playlist in result.fetchall():
                    # Falta el cover
                    print(playlist)
                    result = dict(zip(("id", "cover", "name", "description"), playlist))
                    data.append(result)
            return data, True
        except Exception as e:
            return str(e), False
        finally:
            cursor.close()

    @staticmethod
    def get_songs(id):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "GetPlaylistSongs",
                (id,),
            )
            data = []
            for result in cursor.stored_results():
                for song in result.fetchall():
                    # Falta el cover
                    result = dict(zip(("id", "name", "cover", "musicSrc"), song))
                    data.append(result)
            return data, True
        except Exception as e:
            return str(e), False
        finally:
            cursor.close()

    @staticmethod
    def songs_not_playlist(id):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "GetSongsNotInPlaylist",
                (id,),
            )
            data = []
            for result in cursor.stored_results():
                for song in result.fetchall():
                    # Falta el cover
                    result = dict(
                        zip(("id", "name", "cover", "musicSrc", "singer"), song)
                    )
                    data.append(result)
            return data, True
        except Exception as e:
            return str(e), False
        finally:
            cursor.close()

    @staticmethod
    def add_song(playlist, song, email):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "AddSongPlaylist",
                (playlist, song, email),
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
    def remove_song(playlist, song, email):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "RemoveSongPlaylist",
                (playlist, song, email),
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
    def remove_playlist(id, email):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "RemovePlaylist",
                (id, email),
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
    def edit_playlist(playlist, cover_filename):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            print(playlist, cover_filename)
            # Query
            cursor.callproc(
                "UpdatePlaylist",
                (
                    playlist["id"],
                    playlist["name"],
                    playlist["description"],
                    cover_filename,
                    playlist["email"],
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
    def get_playlist(id):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Ejecuta la consulta SQL para obtener el usuario por su email
            cursor.execute(
                f"""SELECT id_playlist AS id, name, description, image AS cover, email
        FROM PR1.Playlists
        WHERE id_playlist={id}"""
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
