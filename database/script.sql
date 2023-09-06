DELIMITER $$

USE PR1 $$

CREATE TABLE Users (
	email     VARCHAR(255) NOT NULL,
    firstname VARCHAR(150),
    lastname  VARCHAR(150),
    photo     VARCHAR(255),
    password  VARCHAR(150),
    birthdate DATETIME,
    role      INTEGER,
    PRIMARY KEY(email)
) $$

