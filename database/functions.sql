DELIMITER $$

USE PR1 $$

-- FUNCIÓN PARA VERIFICAR QUE UN CORREO TENGA EL FORMATO CORRECTO
DROP FUNCTION IF EXISTS email_format $$
CREATE FUNCTION email_format(
	email VARCHAR(255)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE valido BOOLEAN;
	IF (SELECT REGEXP_LIKE(email, '^[[:alnum:]-\\.]+@([[:alnum:]-]+\\.)+[[:alnum:]-]{2,4}$') = 1) THEN
		SELECT TRUE INTO valido;
	ELSE
		SELECT FALSE INTO valido;
	END IF;
    RETURN (valido);
END $$


-- FUNCIÓN PARA VERIFICAR QUE UN CORREO SEA ÚNICO
DROP FUNCTION IF EXISTS email_exists $$
CREATE FUNCTION email_exists(
	email VARCHAR(255)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE existe BOOLEAN;
    SELECT EXISTS( SELECT 1 FROM Users u WHERE u.email = email) INTO existe;  
    RETURN(existe);
END $$


-- FUNCIÓN PARA VERIFICAR QUE UN NOMBRE DE ARTISTA SEA ÚNICO
DROP FUNCTION IF EXISTS artist_exists $$
CREATE FUNCTION artist_exists(
	name VARCHAR(200)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE existe BOOLEAN;
    SELECT EXISTS( SELECT 1 FROM Artists a WHERE a.name = name) INTO existe;  
    RETURN(existe);
END $$

-- FUNCIÓN PARA VERIFICAR SI UN ARTISTA CUENTA YA CUENTA CON UN ALBUM CON EL NOMBRE INGRESADO
DROP FUNCTION IF EXISTS album_name_exists $$
CREATE FUNCTION album_name_exists(
	id_artist INTEGER,
	name VARCHAR(200)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE existe BOOLEAN;
    SELECT EXISTS( 
    	SELECT 1 FROM Albums a
		WHERE a.name = name
   		AND a.id_artist = id_artist
    ) INTO existe;  
    RETURN(existe);	
END $$

-- FUNCIÓN PARA VERIFICAR SI UN ARTISTA CUENTA YA CUENTA CON UNA CANCIÓN CON EL NOMBRE INGRESADO
DROP FUNCTION IF EXISTS song_name_exists $$
CREATE FUNCTION song_name_exists(
	id_artist INTEGER,
	name VARCHAR(200)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE existe BOOLEAN;
    SELECT EXISTS( 
    	SELECT 1 FROM Songs s
   		JOIN Song_artists sa
   		ON s.id_song = sa.id_song
   		AND s.name = name
   		AND sa.id_artist = id_artist
    ) INTO existe;  
    RETURN(existe);	
END $$


-- FUNCION PARA VERIFICAR QUE LA CANCIÓN QUE SE AGREGA A UN ALBUM, SEA DEL MISMO ARTISTA AL QUE PERTENECE EL ALBUM
DROP FUNCTION IF EXISTS correct_song_album $$
CREATE FUNCTION correct_song_album(
	id_song INTEGER,
	id_album INTEGER
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE correct BOOLEAN;
	SELECT EXISTS(
		SELECT 1 FROM Albums a
		JOIN Song_artists sa
		ON a.id_artist = sa.id_artist
		AND a.id_album = id_album
		AND sa.id_song = id_song
	) INTO correct;
	RETURN(correct);
END $$
