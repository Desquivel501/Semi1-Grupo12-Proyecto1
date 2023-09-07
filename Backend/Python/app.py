from flask import Flask
from decouple import config
from src.routes.auth import Authblueprint
from src.routes.user import user_blueprint
from src.models.database.connection import connect


def createApp():
    app = Flask(__name__)
    # Conectar a DB
    connect()
    return app


app = createApp()
# Manejo de rutas
app.register_blueprint(Authblueprint, url_prefix="/api/", name="auth")
app.register_blueprint(user_blueprint, url_prefix="/api/users/", name="user")

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=config("PORT"), debug=True)
