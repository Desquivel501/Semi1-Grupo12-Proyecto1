import { useState, useContext } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomDrawer from './components/CustomDrawer/CustomDrawer'
import Player from './components/Player/Player'
import StartPage from './pages/StartPage/StartPage'
import AlbumPage from './pages/AlbumPage/AlbumPage';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Perfil from './pages/Perfil/Perfil';
import Historial from './pages/Historial/Historial';
import SearchPage from './pages/SearchPage/SearchPage';
import SongPage from './pages/SongPage/SongPage';
import EditSong from './pages/SongPage/EditSong';
import ArtistPage from './pages/ArtistPage/ArtistPage';
import EditArtist from './pages/ArtistPage/EditArtist';
import { SesionProvider, sesionContext } from './context/SessionContext';
import { useSesion } from './hooks/useSession';
import EditAlbum from './pages/AlbumPage/EditAlbum';
import { ControlLogin, ControlType } from './components/Control/Control';
import GetAll from './pages/SearchPage/GetAll';
import NewAlbum from './pages/AlbumPage/NewAlbum';
import EditPlaylist from './pages/AlbumPage/EditPlaylist';

function App() {
  const [count, setCount] = useState(0)
  return (
    <SesionProvider>
    <BrowserRouter>

    
       <CustomDrawer />
      <Player />

      <Routes>

          <Route path={"/Login"} element={<Login />} />
          <Route path={"/Signup"} element={<Signup />} />

          <Route element={<ControlLogin />}>
            <Route path={"/"} element={<StartPage />} />
            <Route path={"/Search"} element={<SearchPage />} />
            <Route path={"/Song/:id"} element={<SongPage />} />
            <Route path={"/Songs"} element={<GetAll type="song" title={true} crud={false}/>} />
            <Route path={"/Artist/:id"} element={<ArtistPage />} />
            <Route path={"/Artist"} element={<GetAll type="artist" title={true} crud={false}/>} />
            <Route path={"/Album/:id"} element={<AlbumPage />} />
            <Route path={"/Albums"} element={<GetAll type="album" title={true} crud={false}/>} />
            <Route path={"/Profile"} element={<Perfil />} />
            <Route path={"/History"} element={<Historial />} />

            <Route path={"/Playlist/:id"} element={<AlbumPage playlist={true}/>} />
            <Route path={"/Edits/Playlist/:id"} element={<EditPlaylist />} />

            <Route path={"/Radio"} element={<AlbumPage radio={true}/>} />
            <Route path={"/Favoritos"} element={<AlbumPage favoritos={true}/>} />


          </Route>

          <Route element={<ControlType />}>
            <Route path={"/Admin"} element={<SearchPage crud={true}/>} />
            <Route path={"/Edit"}>
              <Route path={"Song/:id"} element={<EditSong edit={true}/>} />
              <Route path={"Artist/:id"} element={<EditArtist edit={true}/>} />
              <Route path={"Album/:id"} element={<EditAlbum />} />
              
            </Route>

            <Route path={"/New"}>
              <Route path={"Song"} element={<EditSong edit={false}/>} />
              <Route path={"Album"} element={<NewAlbum/>} />
              <Route path={"Artist"} element={<EditArtist edit={false}/>} />
              <Route path={"Playlist"} element={<NewAlbum playlist={true}/>} />
            </Route>

          </Route>

          <Route path={"*"} element={<h1>Not Found</h1>} />
          
  </Routes> 

    </BrowserRouter>
    </SesionProvider>
  )
}

export default App
