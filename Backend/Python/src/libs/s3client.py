from src.config.aws import session
from decouple import config
from src.utils.current_time import date_now

AWS_BUCKET_NAME = config("AWS_BUCKET_NAME")

s3_client = session.client("s3")
location = s3_client.get_bucket_location(Bucket=AWS_BUCKET_NAME)
region = location["LocationConstraint"]
url = "https://%s.s3.%s.amazonaws.com/" % (AWS_BUCKET_NAME, region)
print(url)


def upload_file(user, file, img=True):
    try:
        dir = "Fotos/"
        if not img:
            dir = "Canciones/"
        filename = dir + str(date_now()) + user + file.filename
        s3_client.put_object(
            Body=file,
            Bucket=AWS_BUCKET_NAME,
            Key=filename,
            ContentType=file.mimetype,
        )
        return url + filename
    except Exception as e:
        print(e)
        return ""
