import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import './App.css'
import { SceneHub } from './bjs-components/scene/scene-hub'
import Home from './pages/home/home'
import Hub from './pages/hub/hub'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/hub" element={<Hub/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
