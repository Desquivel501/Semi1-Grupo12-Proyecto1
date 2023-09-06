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

