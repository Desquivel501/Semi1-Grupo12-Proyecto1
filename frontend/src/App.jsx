import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CustomDrawer from './components/CustomDrawer/CustomDrawer'
import Player from './components/Player/Player'
import StartPage from './pages/StartPage/StartPage'
import AlbumPage from './pages/AlbumPage/AlbumPage';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Perfil from './pages/Perfil/Perfil'
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
          <Route path={"/Album"} element={<AlbumPage />} />
          <Route path={"/Perfil"} element={<Perfil />} />
      </Routes> 

    </BrowserRouter>
    </SesionProvider>
  )
}

export default App
