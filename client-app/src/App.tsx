import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import './App.css'
import { SceneHub } from './bjs-components/scene/scene-hub'
import Home from './pages/home/home'
import Hub from './pages/hub/hub'
import { PersistGate } from 'redux-persist/integration/react'
import {persistor, store} from './store/index';
import { Provider } from "react-redux";
import { SceneMain } from './bjs-components/scene/scane-main'
import { Hub1 } from './approach-1/hub/hub1'
import { Auth } from './app-components/authenication/auth'

function App() {


  return (
    <BrowserRouter>
    <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Routes >
        <Route path="/" element={<Home/>} />
        <Route path="/hub" element={<Hub/>} />
        <Route path="/auth/:id" element={<Auth/>} />
        <Route path="/hub1" element={<Hub1/>} />
      </Routes>
      </PersistGate>
    </Provider>
    </BrowserRouter>
  
  )
}

export default App
