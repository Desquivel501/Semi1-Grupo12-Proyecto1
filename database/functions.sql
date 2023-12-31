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
	/*DECLARE existe BOOLEAN;
    SELECT EXISTS( 
    	SELECT 1 FROM Songs s
   		JOIN Song_artists sa
   		ON s.id_song = sa.id_song
   		AND s.name = name
   		AND sa.id_artist = id_artist
    ) INTO existe;  
    RETURN(existe);*/
   
   	DECLARE existe BOOLEAN;
    SELECT EXISTS( 
    	SELECT 1 FROM Songs s
		WHERE s.name = name
   		AND s.id_artist = id_artist
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
		/*SELECT 1 FROM Albums a
		JOIN Song_artists sa
		ON a.id_artist = sa.id_artist
		AND a.id_album = id_album
		AND sa.id_song = id_song
		*/
		SELECT 1 FROM Albums a 
		JOIN Songs s 
		ON s.id_artist = a.id_artist 
		AND a.id_album = id_album 
		AND s.id_song = id_song
	) INTO correct;
	RETURN(correct);
END $$

-- FUNCIÓN PARA VERIFICAR QUE UNA CANCIÓN SE ENCUENTRE EN UN ALBUM
DROP FUNCTION IF EXISTS song_in_album $$
CREATE FUNCTION song_in_album(
	id_song_in INTEGER,
	id_album_in INTEGER
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE exists_song BOOLEAN;
	SELECT EXISTS(
		SELECT 1 FROM Songs a
		WHERE a.id_song = id_song_in 
		AND id_album = id_album_in
	) INTO exists_song;
	RETURN(exists_song);
END $$

-- FUNCIÓN PARA VERIFICAR SI UN USUARIO CUENTA YA CUENTA CON UNA PLAYLIST CON EL NOMBRE INGRESADO
DROP FUNCTION IF EXISTS playlist_name_exists $$
CREATE FUNCTION playlist_name_exists (
	email VARCHAR(255),
	name VARCHAR(150)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE exists_name BOOLEAN;
	SELECT EXISTS(
		SELECT 1 FROM Playlists p
		WHERE p.email = email 
		AND p.name = name
	) INTO exists_name;
	RETURN(exists_name);
END $$


-- FUNCIÓN PARA VERIFICAR SI UNA CANCIÓN YA SE ENCUENTRA EN UNA PLAYLIST
DROP FUNCTION IF EXISTS song_in_playlist $$
CREATE FUNCTION song_in_playlist(
	id_playlist INTEGER,
	id_song INTEGER
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
	DECLARE exists_song BOOLEAN;
	SELECT EXISTS(
		SELECT 1 FROM Playlists_details pd
		WHERE pd.id_playlist = id_playlist
		AND pd.id_song = id_song
	) INTO exists_song;
	RETURN(exists_song);
END $$


-- Verificar si una playlist existe
DROP FUNCTION IF EXISTS exists_playlist $$
CREATE FUNCTION exists_playlist (
	id_playlist INTEGER
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
		DECLARE exists_playlist BOOLEAN;
		SELECT EXISTS(
			SELECT 1 FROM Playlists p
			WHERE p.id_playlist = id_playlist
		) INTO exists_playlist;
		RETURN(exists_playlist);
END $$


-- Verificar si una canción existe
DROP FUNCTION IF EXISTS exists_song $$
CREATE FUNCTION exists_song (
	id_song INTEGER
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
		DECLARE exists_song BOOLEAN;
		SELECT EXISTS(
			SELECT 1 FROM Songs s
			WHERE s.id_song = id_song
		) INTO exists_song;
		RETURN(exists_song);
END $$

-- Verificar si un album existe
DROP FUNCTION IF EXISTS exists_album $$
CREATE FUNCTION exists_album (
	id_album INTEGER
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
		DECLARE exists_album BOOLEAN;
		SELECT EXISTS(
			SELECT 1 FROM Albums a
			WHERE a.id_album  = id_album
		) INTO exists_album;
		RETURN(exists_album);
END $$

-- Verificar si una playlist pertenece a un usuario específico
DROP FUNCTION IF EXISTS playlist_owner $$
CREATE FUNCTION playlist_owner (
	id_playlist INTEGER,
	email VARCHAR(255)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
		DECLARE owner BOOLEAN;
		SELECT EXISTS(
			SELECT 1 FROM Playlists p 
			WHERE p.id_playlist = id_playlist 
			AND p.email = email
		) INTO owner;
		RETURN(owner);
END $$

--  Verifica si una canción ya se encuentra en la lista de favoritos de un determinado usuario
DROP FUNCTION IF EXISTS song_in_favorites $$
CREATE FUNCTION song_in_favorites (
	id_song INTEGER,
	email VARCHAR(255)
)
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
		DECLARE in_fav BOOLEAN;
		SELECT EXISTS(
			SELECT 1 FROM Favorites f 
			WHERE f.id_song = id_song 
			AND f.email = email
		) INTO in_fav;
		RETURN(in_fav);		
END $$

-- Obtener id de una canción en base a su link de S3
DROP FUNCTION IF EXISTS get_song_id $$
CREATE FUNCTION get_song_id (
	file_in VARCHAR(255)
)
RETURNS INTEGER
DETERMINISTIC
BEGIN
		DECLARE id_song_out INTEGER;
		SELECT s.id_song INTO id_song_out
		FROM Songs s 
		WHERE s.file = file_in;
		RETURN(id_song_out);
END $$
