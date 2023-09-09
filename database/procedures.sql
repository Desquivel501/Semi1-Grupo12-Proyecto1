DELIMITER $$

USE PR1 $$

/*********************************************** PROCEDIMIENTOS PARA EL MANEJO DE USUARIOS ***********************************************/

-- Procedimiento para el inicio de sesión
DROP PROCEDURE IF EXISTS Login $$
CREATE PROCEDURE Login (
	IN email_in VARCHAR(255),
	IN password_in VARCHAR(150)
)
login:BEGIN
	DECLARE role INTEGER;
	SELECT -1 INTO role;

	SELECT u.role INTO role
	FROM Users u
	WHERE u.email = email_in
	AND u.password = password_in;

	IF role = -1 THEN
		SELECT 'Credenciales de inicio de sesión incorrectas, revise su usuario o contraseña' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE login;
	END IF;
	
	SELECT role AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- Procedimiento para el registro de usuarios
DROP PROCEDURE IF EXISTS Register $$
CREATE PROCEDURE Register(
	IN email_in VARCHAR(255),
	IN firstname_in VARCHAR(150),
	IN lastname_in VARCHAR(150),
	IN photo_in VARCHAR(255),
	IN password_in VARCHAR(255),
	IN birthdate_in DATETIME
)
register:BEGIN
	IF NOT email_format(email_in) THEN
		SELECT 'El correo que ha ingresado no tiene un formato válido' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE register;
	END IF;

	IF email_exists(email_in) THEN
		SELECT 'El correo que ha ingresado ya se encuentra registrado' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE register;
	END IF;

	IF firstname_in = '' OR lastname_in = '' OR firstname_in IS NULL OR lastname_in IS NULL THEN 
		SELECT 'Los nombres no pueden estar en blanco' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE register;
	END IF;

	IF photo_in = '' OR photo_in IS NULL THEN 
		SELECT 'Se debe agregar una fotografía de usuario' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE register;
	END IF;

	IF password_in = '' OR password_in IS NULL THEN 
		SELECT 'Se debe agregar una contraseña para la cuenta' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE register;
	END IF;
	
	INSERT INTO Users
	VALUES (email_in, firstname_in, lastname_in, photo_in, password_in, birthdate_in, 1);

	SELECT 'El usuario ha sido registrado exitosamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- Procedimiento para la creación de un artista
DROP PROCEDURE IF EXISTS CreateArtist $$
CREATE PROCEDURE CreateArtist (
	IN name_in VARCHAR(200),
	IN image_in VARCHAR(250),
	IN birthdate_in DATETIME
)
create_artists:BEGIN
	IF name_in = '' OR name_in IS NULL THEN
		SELECT 'Los nombres no pueden estar en blanco' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_artists;
	END IF;

	IF image_in = '' OR image_in IS NULL THEN 
		SELECT 'Se debe agregar una fotografía de usuario' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_artists;
	END IF;

	IF artist_exists(name_in) THEN
		SELECT 'Este nombre de artista ya se encuentra en uso' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_artists;
	END IF;

	INSERT INTO Artists (name, image, birthdate)
	VALUES (name_in, image_in, birthdate_in);

	SELECT 'El artista ha sido registrado exitosamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- Procedimiento para la actualización de un artista
DROP PROCEDURE IF EXISTS UpdateArtist $$
CREATE PROCEDURE UpdateArtist (
	IN id_artist_in INTEGER,
	IN name_in VARCHAR(200),
	IN image_in VARCHAR(250),
	IN birthdate_in DATETIME
)
update_artist:BEGIN
	DECLARE actual_name VARCHAR(200);
	SELECT a.name INTO actual_name
	FROM Artists a 
	WHERE a.id_artist = id_artist_in;

	IF name_in = '' OR name_in IS NULL THEN
		SELECT 'Los nombres no pueden estar en blanco' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_artist;
	END IF;

	IF image_in = '' OR image_in IS NULL THEN 
		SELECT 'Se debe agregar una fotografía de usuario' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_artist;
	END IF;

	IF artist_exists(name_in) AND (name_in != actual_name) THEN
		SELECT 'Este nombre de artista ya se encuentra en uso' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_artist;
	END IF;

	UPDATE Artists
	SET name = name_in,
	image = image_in,
	birthdate = birthdate_in
	WHERE id_artist = id_artist_in;

	SELECT 'El artista ha sido actualizado exitosamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- Procedimiento para la eliminación de un artista
/*PENDIENTE*/


-- Procedimiento para crear un nuevo album
DROP PROCEDURE IF EXISTS CreateAlbum $$
CREATE PROCEDURE CreateAlbum (
	IN name_in VARCHAR(150),
	IN description_in VARCHAR(255),
	IN image_in VARCHAR(255),
	IN id_artist_in INTEGER
)
create_album:BEGIN
	DECLARE artist_name VARCHAR(150);
	SELECT a.name INTO artist_name 
	FROM Artists a 
	WHERE a.id_artist = id_artist_in;

	IF album_name_exists(id_artist_in, name_in) THEN
		SELECT 'El artista que ha ingresado ya posee una canción/colaboración con el nombre indicado' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_album;
	END IF;	

	IF name_in = '' OR name_In IS NULL THEN
		SELECT 'El nombre del album no puede estar en blanco' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_album;
	END IF;

	IF image_in = '' OR image_in IS NULL THEN
		SELECT 'Se debe asignar una imagen al album' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_album;
	END IF;

	IF (artist_name = '' OR artist_name IS NULL) THEN 
		SELECT 'El artista que ha seleccionado no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_album;
	END IF;
	
	INSERT INTO Albums (name, description, image, id_artist)
	VALUES (name_in, description_in, image_in, id_artist_in);

	SELECT 'El album se ha creado exitosamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';

END $$


-- Procedimiento para actualizar un album
DROP PROCEDURE IF EXISTS UpdateAlbum $$
CREATE PROCEDURE UpdateAlbum (
	IN id_album_in INTEGER,
	IN name_in VARCHAR(150),
	IN description_in VARCHAR(255),
	IN image_in VARCHAR(255),
	IN id_artist_in INTEGER
)
update_album:BEGIN
	DECLARE artist_name VARCHAR(150);
	DECLARE album_name VARCHAR(200);

	SELECT a.name INTO album_name
	FROM Albums a
	WHERE a.id_album = id_song_in;

	SELECT a.name INTO artist_name 
	FROM Artists a 
	WHERE a.id_artist = id_album_in;

	IF name_in = '' OR name_in IS NULL THEN
		SELECT 'El nombre del album no puede estar en blanco' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_album;
	END IF;

	IF image_in = '' OR image_in IS NULL THEN
		SELECT 'Se debe asignar una imagen al album' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_album;
	END IF;	

	IF (artist_name = '' OR artist_name IS NULL) THEN 
		SELECT 'El artista que ha seleccionado no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_album;
	END IF;

	IF album_name_exists(id_artist_in, name_in) AND name_in != album_name THEN
		SELECT 'El artista que ha ingresado ya posee una canción/colaboración con el nombre indicado' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_album;
	END IF;	

	UPDATE Albums
	SET name = name_in,
	description = description_in,
	image = image_in,
	id_artist = id_artist_in
	WHERE id_album = id_album_in;

	SELECT 'El album se ha actualizado exitosamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- Procedimiento para crear una canción
DROP PROCEDURE IF EXISTS CreateSong $$
CREATE PROCEDURE CreateSong (
	IN name_in VARCHAR(200),
	IN image_in VARCHAR(255),
	IN length_in INTEGER,
	IN id_artist_in INTEGER,
	IN file_in VARCHAR(255)
)
create_song:BEGIN
	DECLARE artist_name VARCHAR(150);
	SELECT a.name INTO artist_name 
	FROM Artists a 
	WHERE a.id_artist = id_artist_in;

	IF (artist_name = '' OR artist_name IS NULL) THEN 
		SELECT 'El artista que ha seleccionado no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_song;
	END IF;

	IF name_in = '' OR name_in IS NULL THEN
		SELECT 'El nombre de la canción no puede estar en blanco' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_song;
	END IF;

	IF image_in = '' OR image_in IS NULL THEN
		SELECT 'Se debe asignar una imagen a la canción' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_song;
	END IF;	

	IF length_in < 0 THEN
		SELECT 'La duración de la canción no es válida' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_song;
	END IF;

	IF file_in = '' OR file_in IS NULL THEN
		SELECT 'Se debe asignar un archivo de audio a la canción' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_song;
	END IF;	

	IF song_name_exists(id_artist_in, name_in) THEN
		SELECT 'El artista que ha ingresado ya posee una canción/colaboración con el nombre indicado' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_song;
	END IF;	

	INSERT INTO Songs(name, image, length, file, id_album)
	VALUES (name_in, image_in, length_in, file_in, NULL);

	INSERT INTO Song_artists 
	VALUES (LAST_INSERT_ID(), id_artist_in);
	
	SELECT 'La canción ha sido creada exitósamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- Procedimiento para actualizar una canción
DROP PROCEDURE IF EXISTS UpdateSong $$
CREATE PROCEDURE UpdateSong (
	IN id_song_in INTEGER,
	IN name_in VARCHAR(200),
	IN image_in VARCHAR(255),
	IN length_in INTEGER,
	IN id_artist_in INTEGER,
	IN file_in VARCHAR(255)
)
update_song:BEGIN
	DECLARE artist_name VARCHAR(150);
	DECLARE song_name VARCHAR(200);

	SELECT s.name INTO song_name
	FROM Songs s
	WHERE s.id_song = id_song_in;

	SELECT a.name INTO artist_name 
	FROM Artists a 
	WHERE a.id_artist = id_artist_in;

	IF (artist_name = '' OR artist_name IS NULL) THEN 
		SELECT 'El artista que ha seleccionado no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_song;
	END IF;

	IF name_in = '' OR name_in IS NULL THEN
		SELECT 'El nombre de la canción no puede estar en blanco' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_song;
	END IF;

	IF image_in = '' OR image_in IS NULL THEN
		SELECT 'Se debe asignar una imagen a la canción' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_song;
	END IF;	

	IF length_in < 0 THEN
		SELECT 'La duración de la canción no es válida' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_song;
	END IF;

	IF file_in = '' OR file_in IS NULL THEN
		SELECT 'Se debe asignar un archivo de audio a la canción' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_song;
	END IF;	

	IF song_name_exists(id_artist_in, name_in) AND name_in != song_name THEN
		SELECT 'El artista que ha ingresado ya posee una canción/colaboración con el nombre indicado' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE update_song;
	END IF;	

	UPDATE Songs
	SET name = name_in,
	image = image_in,
	length = length_in,
	file = file_in
	WHERE id_song = id_song_in;

	UPDATE Song_artists
	SET id_artist = id_artist_in
	WHERE id_song = id_song_in;

	SELECT 'La canción ha sido actualizada exitósamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- Procedimiento para agregar una canción a un album
DROP PROCEDURE IF EXISTS AddSongAlbum $$
CREATE PROCEDURE AddSongAlbum(
	IN id_song_in INTEGER,
	IN id_album_in INTEGER
)
add_song_album:BEGIN
	IF NOT(correct_song_album(id_song_in, id_album_in)) THEN
		SELECT 'La canción y el album a asignar deben ser del mismo artista' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE add_song_album;	
	END IF;

	UPDATE Songs
	SET id_album = id_album_in
	WHERE id_song = id_song_in;

	SELECT 'La canción ha sido asignada al album exitósamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- Procedimiento para crear una playlist
DROP PROCEDURE IF EXISTS CreatePlaylist $$
CREATE PROCEDURE CreatePlaylist (
	IN name_in VARCHAR(150),
	IN description_in VARCHAR(255),
	IN image_in VARCHAR(255),
	IN email_in VARCHAR(255)
)
create_playlist:BEGIN
	IF NOT email_exists(email_in) THEN
		SELECT 'El correo que ha ingresado no pertenece a una cuenta' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_playlist;
	END IF;	

	IF name_in = '' OR name_in IS NULL THEN
		SELECT 'El nombre de la playlist no puede estar vacío' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_playlist;
	END IF;

	IF image_in = '' OR image_in IS NULL THEN
		SELECT 'Se debe asignar una imagen de portada para la playlist' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_playlist;
	END IF;	

	IF playlist_name_exists(email_in, name_in) THEN
		SELECT 'Ya existe una playlist con el nombre indicado' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE create_playlist;
	END IF;


	INSERT INTO Playlists (name, description, image, email)
	VALUES (name_in, description_in, image_in, email_in);

	SELECT 'La playlist ha sido creada exitósamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- Procedimiento para agregar una canción a una playlist
DROP PROCEDURE IF EXISTS AddSongPlaylist $$
CREATE PROCEDURE AddSongPlaylist (
	IN id_playlist_in INTEGER,
	IN id_song_in INTEGER,
	IN email_in VARCHAR(255)
)
add_song_playlist:BEGIN
	IF NOT playlist_owner(id_playlist_in, email_in) THEN
		SELECT 'La playlist que intenta modificar no es de su propiedad' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE add_song_playlist;
	END IF;

	IF NOT exists_playlist(id_playlist_in) THEN
		SELECT 'La playlist indicada no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE add_song_playlist;
	END IF;

	IF NOT exists_song(id_song_in) THEN
		SELECT 'La canción indicada no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE add_song_playlist;
	END IF;

	IF song_in_playlist(id_playlist_in, id_song_in) THEN
		SELECT 'La canción ya se encuentra en la playlist' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE add_song_playlist;
	END IF;

	INSERT INTO Playlists_details
	VALUES(id_playlist_in, id_song_in);

	SELECT 'La canción fue agregada exitósamente a la playlist' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- Procedimiento para eliminar una canción de una playlist
DROP PROCEDURE IF EXISTS RemoveSongPlaylist $$
CREATE PROCEDURE RemoveSongPlaylist (
	IN id_playlist_in INTEGER,
	IN id_song_in INTEGER,
	IN email_in VARCHAR(255)
)
remove_song_playlist:BEGIN
	IF NOT playlist_owner(id_playlist_in, email_in) THEN
		SELECT 'La playlist que intenta modificar no es de su propiedad' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE remove_song_playlist;
	END IF;

	IF NOT exists_playlist(id_playlist_in) THEN
		SELECT 'La playlist indicada no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE remove_song_playlist;
	END IF;

	IF NOT exists_song(id_song_in) THEN
		SELECT 'La canción indicada no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE remove_song_playlist;
	END IF;

	IF NOT song_in_playlist(id_playlist_in, id_song_in) THEN
		SELECT 'La canción indicada no se encuentra en la playlist' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE remove_song_playlist;
	END IF;

	DELETE FROM Playlists_details
	WHERE id_song = id_song_in
	AND id_playlist = id_playlist_in;

	SELECT 'La canción fue eliminada exitósamente de la playlist' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- Procedimiento para eliminar una playlist
DROP PROCEDURE IF EXISTS RemovePlaylist $$
CREATE PROCEDURE RemovePlaylist (
	IN id_playlist_in INTEGER,
	IN email_in VARCHAR(255)
)
remove_playlist:BEGIN
	IF NOT playlist_owner(id_playlist_in, email_in) THEN
		SELECT 'La playlist que intenta eliminar no es de su propiedad' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE remove_playlist;
	END IF;

	IF NOT exists_playlist(id_playlist_in) THEN
		SELECT 'La playlist indicada no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE remove_playlist;
	END IF;

	DELETE FROM Playlists p
	WHERE p.id_playlist = id_playlist_in;

	SELECT 'La playlist fue eliminada exitósamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$


-- Procedimiento para eliminar una canción de favoritos
DROP PROCEDURE IF EXISTS AddToFavorites $$
CREATE PROCEDURE AddToFavorites (
	IN id_song_in INTEGER,
	IN email_in VARCHAR(255)
)
add_to_favorites:BEGIN
	IF NOT exists_song(id_song_in) THEN
		SELECT 'La canción indicada no existe' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE add_to_favorites;
	END IF;

	IF song_in_favorites(id_song_in, email_in) THEN
		DELETE FROM Favorites f
		WHERE f.id_song = id_song_in
		AND f.email = email_in;
	
		SELECT 'La canción se removió de favoritos' AS 'MESSAGE',
		'SUCCESS' AS 'TYPE';
		LEAVE add_to_favorites;
	END IF;

	INSERT INTO Favorites
	VALUES (email_in, id_song_in);

	SELECT 'La canción se agregó a favoritos' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$
