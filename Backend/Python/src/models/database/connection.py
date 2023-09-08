import mysql.connector
from mysql.connector import errorcode
from decouple import config

cnx = None


def connect():
    try:
        global cnx
        cnx = mysql.connector.connect(
            user=config("DB_USER"),
            password=config("DB_PASSWORD"),
            host=config("DB_HOST"),
            database=config("DB_DB"),
        )
        print(cnx)
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)


def getCnx():
    return cnx
