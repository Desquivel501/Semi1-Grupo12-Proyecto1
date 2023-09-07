from flask import Flask
from src.routes.auth import Authblueprint
from src.models.database.connection import connect


def createApp():
    app = Flask(__name__)
    # Conectar a DB
    connect()
    return app


app = createApp()
# Manejo de rutas
app.register_blueprint(Authblueprint, url_prefix="/api/")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
