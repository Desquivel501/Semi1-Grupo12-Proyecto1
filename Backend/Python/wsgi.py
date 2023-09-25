
from app import app
from decouple import config

if __name__ == "__main__":
    app.run(threaded=True, host="127.0.0.1", port=config(
            "PORT"), debug=True)
