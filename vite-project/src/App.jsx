import { Component, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Component/Home/Home'
import Login from './Component/Login/Login';
import { GithubAuthProvider, signInWithPopup } from 'firebase/auth'



function App() {
  
  const [user, setUser] = useState(null);
  const signInWithGoogle = async () => {
      try {
          const result = await signInWithPopup(auth, provider);
          setUser(result.user);
      } catch (error) {
          console.error("Error signing in with Google", error);
      }
  };
    const provider = new GithubAuthProvider();
    const signInWithGithub = async () => {
        try {
            signInWithPopup(auth, provider)
                .then((result) => {
                    const credential = GithubAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    const user = result.user;
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const email = error.customData.email;
                    const credential = GithubAuthProvider.credentialFromError(error);
                });
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };

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

