import React, { useState } from 'react'
import './Login.css'
import { createUserWithEmailAndPassword, GithubAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../FirebaseConfig';

function Login() {
    const [user, setUser] = useState(null);
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            window.location.assign("/")
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };
    const signInWithGithub = async () => {
        try {
            const githubProvider = new GithubAuthProvider(); 
            const result = await signInWithPopup(auth, githubProvider); 
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log("GitHub sign-in successful:", user);
            setUser(user);
            window.location.assign("/");
        } catch (error) {
            console.error("Error signing in with GitHub", error);
        }
    };
    return (
        <>
            <div className="login-container">
                <div className="login">
                    <div className="logos">
                        <div className="logo">
                            <img src="/public/logo3.jpg" alt="" />
                        </div>
                    </div>
                    <div className="form">
                        <div className="lista">
                            <div className="hadding">
                                <h1>Enter your password</h1>
                            </div>
                            <div className="email">
                                <input type="email" placeholder='Enter your email' />
                            </div>
                      
                            <div className="buttons">
                                <button  >Continue</button>
                            </div>
                          
                            <div className="google flex w-90 justify-center my-2 ">
                            <div className="icons flex gap-2 my-2  " onClick={signInWithGoogle}>
                                <img src="/public/search.png" alt="google logo"  className='w-6'/>
                                <h3 onClick={signInWithGoogle}>login whith google</h3>
                            </div>
                                          
                           
                            
                
                            </div>
                            <div className="icons flex gap-2 my-2  " onClick={signInWithGithub}>
                                <img src="/public/git.webp" alt="google logo"  className='w-8'/>
                                <h3 onClick={signInWithGithub}>Continue With Github</h3>

                            </div>
                            <div className="term flex gap-1 justify-center my-1">
                                <p>Terms of Use</p>
                                <p>| Privacy Policy</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login