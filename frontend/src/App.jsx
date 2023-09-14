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

function App() {
  const [count, setCount] = useState(0)

  const [user, setUser] = useState(() => {
    const sesion = window.localStorage.getItem("user");
    if (sesion != null) {
      return JSON.parse(sesion);
    }
    return {
      id: "",
      token: "",
      type: 0
    };
  });

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
            <Route path={"/Songs"} element={<GetAll type="song" title={true} crud={true}/>} />
            <Route path={"/Artist/:id"} element={<ArtistPage />} />
            <Route path={"/Artist"} element={<GetAll type="artists" title={true} crud={true}/>} />
            <Route path={"/Album/:id"} element={<AlbumPage />} />
            <Route path={"/Albums"} element={<GetAll type="albums" title={true} crud={true}/>} />
            <Route path={"/Profile"} element={<Perfil />} />
          </Route>

          <Route element={<ControlType />}>
            <Route path={"/Admin"} element={<SearchPage crud={true}/>} />
            <Route path={"/Edit"}>
              <Route path={"Song/:id"} element={<EditSong />} />
              <Route path={"Artist/:id"} element={<EditArtist />} />
              <Route path={"Album/:id"} element={<EditAlbum />} />
              <Route path={"Playlist/:id"} element={<AlbumPage />} />
            </Route>

            <Route path={"/New"}>
              <Route path={"Song"} element={<EditSong edit={false}/>} />
            </Route>

          </Route>

          <Route path={"*"} element={<h1>Not Found</h1>} />
          
      </Routes> 

    </BrowserRouter>
    </SesionProvider>
  )
}

export default App
