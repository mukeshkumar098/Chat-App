import React from 'react'
import './Login.css';
import { auth, provider } from '../FirebaseConfig';
import { useState } from 'react'
import { signInWithPopup, GithubAuthProvider } from 'firebase/auth';

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
            console.error("Error signing in with GitHub", error.message);
        }
    };
    return (
        <>
            <div className="login-container w-full flex justify-center items-center ">
                <div className="login w-90 mt-20">
                    <div className="logos">
                        <div className="logo w-90  flex justify-center">
                            <img src="/public/logo3.jpg" className='w-20 text-center rounded-[50%] ' alt="" />
                        </div>
                    </div>
                    <div className="form w-90 flex justify-center items-center">
                        <div className="lista">
                            <div className="hadding">
                                <h1 className='font-bold '>Enter your password</h1>
                            </div>
                            <div className="email">
                                <input className='p-4 f-4 mt-5 w-[300px]' type="email" placeholder='Enter your email' />
                            </div>
                            <div className="password">
                                <input className='p-4 f-4 mt-5 w-[300px] rounded-[10px]' type="password" placeholder='Enter your password' />
                            </div>
                      
                            <div className="buttons">
                                <button className='p-3 bg-[royalblue] w-[300px] rounded-[10px] text-[white] mt-4 '  >Continue</button>
                            </div>
                          
                            <div className="google flex w-90 justify-center my-2 hover:cursor-pointer ">
                            <div className="icons flex gap-2 mt-2 p-3 w-[300px] hover:cursor-pointer rounded-[10px]  " onClick={signInWithGoogle}>
                                <img src="/public/search.png" alt="google logo"  className='w-8'/>
                                <h3 onClick={signInWithGoogle}>login with google</h3>
                            </div>
                                          
                           
                            
                
                            </div>
                            <div className="git flex w-90 justify-center my-2 ">
                            <div className="icons flex gap-2 mt-2 p-3 w-[300px] hover:cursor-pointer rounded-[10px] " onClick={signInWithGithub}>
                                <img src="/public/git.webp" alt="google logo"  className='w-9'/>
                                <h3>Continue With Github</h3>

                            </div>
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