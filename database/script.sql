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


CREATE TABLE Artists (
	id_artist INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR(200),
	image VARCHAR(250),
	birthdate DATETIME,
	PRIMARY KEY(id_artist)
) $$


CREATE TABLE Albums (
	id_album INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR(150),
	description VARCHAR(255),
	image VARCHAR(255),
	id_artist INTEGER,
	PRIMARY KEY(id_album),
	FOREIGN KEY(id_artist) REFERENCES Artists(id_artist)
) $$


CREATE TABLE Songs (
	id_song INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR(200),
	image VARCHAR(255),
	length INTEGER,
	file VARCHAR(255),
	id_album INTEGER,
	PRIMARY KEY(id_song),
	FOREIGN KEY(id_album) REFERENCES Albums(id_album)
) $$


CREATE TABLE Song_artists (
	id_song INTEGER,
	id_artist INTEGER,
	UNIQUE(id_song, id_artist),
	FOREIGN KEY(id_song) REFERENCES Songs(id_song),
	FOREIGN KEY(id_artist) REFERENCES Artists(id_artist)
) $$


SELECT * FROM Artists

CALL CreateArtist('Eminem', 'fsfasdfasdf', '1972-10-17')
CALL CreateArtist('NF', 'fsfasdfasdf', '1991-03-30')

CALL UpdateArtist(1, 'Emin3m', 'fsfasdfasdf', '1972-10-17')

CALL CreateAlbum('Music to be murdered by', 'Music to be murdered by side A', 'sfasdfasf', 1)

CALL UpdateAlbum(1, 'Music to be murdered by', 'Music to be murdered by side A', 'sfasdfasf', 1)

CALL CreateSong('Marsh', 'asdfasfasd', 200, 1, 'afdsafdsafds')
CALL CreateSong('Darkness', 'asdfasfasd', 337, 1, 'afdsafdsafds')
CALL CreateSong('Never love again', 'asdfasfasd', 337, 1, 'afdsafdsafds')
CALL CreateSong('Clouds', 'asdfasfasd', 243, 2, 'afdsafdsafds')

CALL UpdateSong(3, 'The Search', 'adfasdaf', 242, 2, 'sfasdfsafda')

SELECT * FROM Albums
SELECT * FROM Songs
SELECT * FROM Song_artists