from src.models.database.connection import getCnx


class ReportModel:

    @staticmethod
    def add_history(song, email):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "AddToHistory",
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
    def top_songs(email):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "TopCanciones",
                (email,),
            )
            data = []
            for result in cursor.stored_results():
                for song in result.fetchall():
                    result = dict(zip(("id", "name", "cover", "times_played"), song))
                    data.append(result)
            cursor.close()
            return data, True
        except Exception as e:
            cursor.close()
            return str(e), False

    @staticmethod
    def top_artists(email):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "TopArtistas",
                (email,),
            )
            data = []
            for result in cursor.stored_results():
                for song in result.fetchall():
                    result = dict(zip(("id", "name", "cover", "times_played"), song))
                    data.append(result)
            cursor.close()
            return data, True
        except Exception as e:
            cursor.close()
            return str(e), False

    @staticmethod
    def top_albums(email):
        try:
            db = getCnx()  # Obtiene una conexión desde la función
            cursor = db.cursor(buffered=True)
            # Query
            cursor.callproc(
                "TopAlbumes",
                (email,),
            )
            data = []
            for result in cursor.stored_results():
                for song in result.fetchall():
                    result = dict(
                        zip(
                            ("id", "name", "description", "cover", "times_played"), song
                        )
                    )
                    data.append(result)
            cursor.close()
            return data, True
        except Exception as e:
            cursor.close()
            return str(e), False
