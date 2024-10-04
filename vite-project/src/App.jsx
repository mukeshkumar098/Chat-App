import { Component, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Component/Home/Home'
import Login from './Component/Login/Login';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth'



function App() {
  

  return (
    <>
     <div className='App'>
   <Routes>
    <Route path='/' element={<><Home/></>}></Route>
    <Route path='/login' element={<><Login/></>}></Route>
   </Routes>
     </div> 
     

    </>

  )
}

export default App

