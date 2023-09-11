import { useState } from 'react'
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
import ArtistPage from './pages/ArtistPage/ArtistPage';
import { SesionProvider } from './context/SessionContext';

function App() {
  const [count, setCount] = useState(0)

  return (
    <SesionProvider>
    <BrowserRouter>
    
      <CustomDrawer />
      <Player />

      <Routes>
          <Route index path={"/"} element={<StartPage />} />
          <Route path={"/Album/:id"} element={<AlbumPage />} />
          <Route path={"/Login"} element={<Login />} />
          <Route path={"/Signup"} element={<Signup />} />
          <Route path={"/Perfil"} element={<Perfil />} />
          <Route path={"/Search"} element={<SearchPage />} />
          <Route path={"/Song/:id"} element={<SongPage />} />
          <Route path={"/Artist/:id"} element={<ArtistPage />} />
          <Route path={"*"} element={<h1>Not Found</h1>} />
      </Routes> 

    </BrowserRouter>
    </SesionProvider>
  )
}

export default App
