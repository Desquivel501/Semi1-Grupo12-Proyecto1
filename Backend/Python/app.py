from flask import Flask
from flask_cors import CORS
from decouple import config
from src.routes.auth import Authblueprint
from src.routes.user import user_blueprint
from src.routes.artist import artist_blueprint
from src.routes.song import song_blueprint
from src.routes.album import album_blueprint
from src.routes.playlist import playlist_blueprint
from src.routes.report import report_blueprint
from src.models.database.connection import connect


def createApp():
    app = Flask(__name__)
    CORS(app)
    # Conectar a DB
    connect()
    return app


app = createApp()


@app.route("/")
def home():
    return "<h1>Hello world</h1>", 200


# Manejo de rutas
app.register_blueprint(Authblueprint, url_prefix="/api/", name="auth")
app.register_blueprint(user_blueprint, url_prefix="/api/users/", name="user")
app.register_blueprint(artist_blueprint, url_prefix="/api/artists/", name="artist")
app.register_blueprint(song_blueprint, url_prefix="/api/songs/", name="song")
app.register_blueprint(album_blueprint, url_prefix="/api/albums/", name="album")
app.register_blueprint(
    playlist_blueprint, url_prefix="/api/playlists/", name="playlist"
)
app.register_blueprint(report_blueprint, url_prefix="/api/reports/", name="reports")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=config("PORT"), debug=True)
