DELIMITER $$

CREATE DATABASE PR1 $$

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
	FOREIGN KEY(id_artist) REFERENCES Artists(id_artist) ON DELETE CASCADE
) $$


CREATE TABLE Songs (
	id_song INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR(200),
	image VARCHAR(255),
	length INTEGER,
	file VARCHAR(255),
	id_album INTEGER,
	id_artist INTEGER,
	PRIMARY KEY(id_song),
	FOREIGN KEY(id_album) REFERENCES Albums(id_album) ON DELETE SET NULL,
	FOREIGN KEY(id_artist) REFERENCES Artists(id_artist) ON DELETE CASCADE
) $$

/*
CREATE TABLE Song_artists (
	id_song INTEGER,
	id_artist INTEGER,
	UNIQUE(id_song, id_artist),
	FOREIGN KEY(id_song) REFERENCES Songs(id_song) ON DELETE CASCADE,
	FOREIGN KEY(id_artist) REFERENCES Artists(id_artist) ON DELETE CASCADE
) $$
*/

CREATE TABLE Playlists (
	id_playlist INTEGER NOT NULL AUTO_INCREMENT,
	name VARCHAR(150),
	description VARCHAR(255),
	image VARCHAR(255),
	email VARCHAR(255),
	PRIMARY KEY(id_playlist),
	FOREIGN KEY(email) REFERENCES Users(email) ON DELETE CASCADE
) $$

CREATE TABLE Playlists_details (
	id_playlist INTEGER,
	id_song INTEGER,
	UNIQUE(id_playlist, id_song),
	FOREIGN KEY(id_playlist) REFERENCES Playlists(id_playlist) ON DELETE CASCADE,
	FOREIGN KEY(id_song) REFERENCES Songs(id_song) ON DELETE CASCADE
) $$

CREATE TABLE Favorites (
	email VARCHAR(255),
	id_song INTEGER,
	UNIQUE(email, id_song),
	FOREIGN KEY(email) REFERENCES Users(email) ON DELETE CASCADE,
	FOREIGN KEY(id_song) REFERENCES Songs(id_song) ON DELETE CASCADE
) $$

CREATE TABLE History (
	email VARCHAR(255),
	id_song INTEGER,
	date DATETIME,
	FOREIGN KEY(email) REFERENCES Users(email) ON DELETE CASCADE
	-- FOREIGN KEY(id_song) REFERENCES Songs(id_song) ON DELETE CASCADE
) $$
