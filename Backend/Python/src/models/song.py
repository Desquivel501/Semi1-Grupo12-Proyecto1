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
    def get_song(id, email):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "GetSong",
                (
                    id,
                    email,
                ),
            )
            data = []
            for result in cursor.stored_results():
                for song in result.fetchall():
                    result = dict(
                        zip(
                            ("id", "name", "singer", "cover", "musicSrc", "inFav"), song
                        )
                    )
                    data.append(result)
            return data, True
        except Exception as e:
            return str(e), False
        finally:
            cursor.close()

    @staticmethod
    def get_songs():
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "GetAllSongs",
            )
            data = []
            for result in cursor.stored_results():
                for song in result.fetchall():
                    result = dict(
                        zip(
                            ("id", "name", "cover", "musicSrc", "artist", "album"), song
                        )
                    )
                    data.append(result)
            return data, True
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
                (int(id_song),),
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
    def edit_song(song, cover_filename, source_filename):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "Updatesong",
                (
                    song["id"],
                    song["name"],
                    cover_filename,
                    song["duration"],
                    song["artist"],
                    source_filename,
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
