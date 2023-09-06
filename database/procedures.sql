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
	
	SELECT rol AS 'MESSAGE',
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

	IF name_in = '' OR image_in IS NULL THEN
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
	id_album_in INTEGER,
	name_in VARCHAR(150),
	description_in VARCHAR(255),
	image_in VARCHAR(255),
	id_artist_in INTEGER
)
update_album:BEGIN
	DECLARE artist_name VARCHAR(150);
	SELECT a.name INTO artist_name 
	FROM Artists a 
	WHERE a.id_artist = id_artist_in;

	IF name_in = '' OR image_in IS NULL THEN
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

	UPDATE Albums
	SET name = name_in,
	description = description_in,
	image = image_in,
	id_artist = id_artist_in
	WHERE id_album = id_album_in;

	SELECT 'El album se ha actualizado exitosamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$
