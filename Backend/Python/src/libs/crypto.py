import hashlib


def encrypt(value):
    return hashlib.sha1(str(value).encode("utf-8")).hexdigest()
