import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CustomDrawer from './components/CustomDrawer/CustomDrawer'
import Player from './components/Player/Player'
import StartPage from './pages/StartPage/StartPage'
import AlbumPage from './pages/AlbumPage/AlbumPage';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>

      {/* <Login /> */}

      <Signup />
    
{/*     
      <CustomDrawer />
      <Player />

      <Routes>
          <Route index path={"/"} element={<StartPage />} />
          <Route path={"/Album"} element={<AlbumPage />} />
      </Routes>  */}

    </BrowserRouter>
  )
}

export default App
