DELIMITER $$

USE PR1 $$

/*CREANDO USUARIO*/
CALL Register('montenegroandres2001@gmail.com', 'José', 'Montenegro', 'asfasdfasdfasdfd', 'prueba1234', '2001-08-28') $$
CALL Register('a@b.com', 'Firstname1', 'Lastname1', 'asfasdfasdfasdfd', 'user1', '2001-08-28') $$

/*CREANDO ARTISTAS...*/
CALL CreateArtist('Emin3m', 'fsfasdfasdf', '1972-10-17') $$
CALL CreateArtist('NF', 'fsfasdfasdf', '1991-03-30') $$


/*ACTUALIZANDO ARTISTAS...*/
CALL UpdateArtist(1, 'Emin3m', 'fsfasdfasdf', '1972-10-17') $$


/*CREANDO ALBUM...*/
CALL CreateAlbum('Music to be murdered by', 'Music to be murdered by side B', 'sfasdfasf', 1) $$
CALL CreateAlbum('Clouds', 'Clouds', 'sfasdfasf', 2) $$

/*ACTUALIZANDO ALBUM...*/
CALL UpdateAlbum(1, 'Music to be murdered by', 'Music to be murdered by side A', 'aaaaaaaaaaaaaaa', 1) $$

/*CREANDO CANCIONES...*/
CALL CreateSong('Marsh', 'asdfasfasd', 200, 1, 'afdsafdsafds') $$
CALL CreateSong('Darkness', 'asdfasfasd', 337, 1, 'afdsafdsafds') $$
CALL CreateSong('Never love again', 'asdfasfasd', 337, 1, 'afdsafdsafds') $$
CALL CreateSong('Clouds', 'asdfasfasd', 243, 2, 'afdsafdsafds') $$
CALL CreateSong('Just like you', 'asdfasfasd', 251, 2, 'afdsafdsafds') $$
CALL CreateSong('Drifting', 'asdfasfasd', 200, 2, 'afdsafdsafds') $$

/*ACTUALIZANDO CANCIONES*/
CALL UpdateSong(4, 'The Search', 'adfasdaf', 242, 2, 'sfasdfsafda') $$

/*AGREGANDO CANCIONES A ALBUM*/
CALL AddSongAlbum(1, 1) $$
CALL AddSongAlbum(4, 1) $$
CALL AddSongAlbum(2, 1) $$
CALL AddSongAlbum(3, 1) $$
CALL AddSongAlbum(4, 2) $$
CALL AddSongAlbum(5, 2) $$

/*CREANDO PLAYLISTS*/
CALL CreatePlaylist('Hip Hop Mix', 'Test', 'sfafsdfasfg', 'montenegroandres2001@gmail.com') $$
CALL CreatePlaylist('Hip Hop Mix', 'Test', 'sfafsdfasfg', 'a@b.com') $$

/*AGREGANDO CANCIONES A PLAYLSIT*/
CALL AddSongPlaylist(1,1, 'montenegroandres2001@gmail.com') $$
CALL AddSongPlaylist(1,2, 'montenegroandres2001@gmail.com') $$
CALL AddSongPlaylist(1,4, 'montenegroandres2001@gmail.com') $$

CALL AddSongPlaylist(2,1, 'a@b.com') $$
CALL AddSongPlaylist(2,3, 'a@b.com') $$
CALL AddSongPlaylist(2,4, 'a@b.com') $$

/*REMOVIENDO CANCIONES DE PLAYLSIT*/
CALL RemoveSongPlaylist(2,1, 'montenegroandres2001@gmail.com') $$
CALL RemoveSongPlaylist(2,3, 'a@b.com') $$

/*AGREGANDO CANCIONES A PLAYLSIT*/
CALL AddSongPlaylist(1,1, 'montenegroandres2001@gmail.com') $$

/*REMOVIENDO CANCIONES DE PLAYLSIT*/
CALL RemovePlaylist(1,  'montenegroandres2001@gmail.com')  $$

/*AGREGANDO CANCIONES A FAVORITOS*/
CALL AddToFavorites(1, 'montenegroandres2001@gmail.com') $$
CALL AddToFavorites(2, 'montenegroandres2001@gmail.com') $$
CALL AddToFavorites(3, 'montenegroandres2001@gmail.com') $$
CALL AddToFavorites(4, 'montenegroandres2001@gmail.com') $$
CALL AddToFavorites(5, 'montenegroandres2001@gmail.com') $$

/*ELIMINANDO ARTISTA*/
CALL DeleteArtist(2) $$ 

/*ELIMINANDO CANCIÓN*/
CALL DeleteSong(1) $$


/*ELIMINANDO ALBUM*/
CALL DeleteAlbum(1) $$

SELECT * FROM Songs s $$
SELECT * FROM Song_artists sa $$
SELECT * FROM Playlists p $$
SELECT * FROM Playlists_details pd $$
SELECT * FROM Artists a $$
SELECT * FROM Favorites f $$
SELECT * FROM Albums a2 $$