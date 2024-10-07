import { Component, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Component/Home/Home'
import Login from './Component/Login/Login';
import { GithubAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { auth } from './Component/FirebaseConfig'



function App() {
  
  const [user, setUser] = useState(null);
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser);
        } else {
            setUser(null);
        }
    });

    return () => unsubscribe();
}, [auth]);
 

  return (
    <>
     <div className='App'>
   <Routes>
    <Route path='/' element={<>{user?<Home/>:<Login/>}</>}></Route>
    <Route path='/login' element={<><Login/></>}></Route>
   </Routes>
     </div> 
     

    </>

  )
}

export default App

