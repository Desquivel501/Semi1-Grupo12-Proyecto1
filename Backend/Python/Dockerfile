FROM python:3

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
EXPOSE 5000

# CMD ["python3","-m","flask","run","--host=0.0.0.0"]
CMD ["gunicorn","-w","4","-b","0.0.0.0:5000","app:app"]
