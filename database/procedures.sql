DELIMITER $$

USE PR1 $$

/*********************************************** PROCEDIMIENTOS PARA EL MANEJO DE USUARIOS ***********************************************/

-- Procedimiento para el inicio de sesión
DROP PROCEDURE IF EXISTS Login $$
CREATE PROCEDURE Login (
	IN email VARCHAR(255),
	IN password VARCHAR(150)
)
login:BEGIN
	DECLARE role INTEGER;
	SELECT -1 INTO role;

	SELECT u.role INTO role
	FROM Users u
	WHERE u.email = email
	AND u.password = password;

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
	IN email VARCHAR(255),
	IN firstname VARCHAR(150),
	IN lastname VARCHAR(150),
	IN photo VARCHAR(255),
	IN password VARCHAR(255),
	IN birthdate DATETIME
)
register:BEGIN
	IF NOT email_format(email) THEN
		SELECT 'El correo que ha ingresado no tiene un formato válido' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE register;
	END IF;

	IF email_exists(email) THEN
		SELECT 'El correo que ha ingresado ya se encuentra registrado' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE register;
	END IF;

	IF firstname = '' OR lastname = '' THEN 
		SELECT 'Los nombres no pueden estar en blanco' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE register;
	END IF;

	IF photo = '' THEN 
		SELECT 'Se debe agregar una fotografía de usuario' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE register;
	END IF;

	IF password = '' THEN 
		SELECT 'Se debe agregar una contraseña para la cuenta' AS 'MESSAGE',
		'ERROR' AS 'TYPE';
		LEAVE register;
	END IF;
	
	INSERT INTO Users
	VALUES (email, firstname, lastname, photo, password, birthdate, 1);

	SELECT 'El usuario ha sido registrado exitosamente' AS 'MESSAGE',
	'SUCCESS' AS 'TYPE';
END $$

