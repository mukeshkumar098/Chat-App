import React, { useEffect } from 'react'
import { Component, useState } from 'react'
import OpenAI from "openai";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Chat from '../Chat';
import { FaArrowUp } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { FaSlidersH } from "react-icons/fa";
import { MdAddLink } from "react-icons/md";
import { GithubAuthProvider } from 'firebase/auth';
// import Login from './Component/Login/Login'
import '../Chat.css'

import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { FaSquare } from "react-icons/fa";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });
function Home() {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    
    const provider = new GithubAuthProvider();
  
    const signInWithGithub = async () => {
        try {
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                    const credential = GithubAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;

                    // The signed-in user info.
                    const user = result.user;
                    // IdP data available using getAdditionalUserInfo(result)
                    // ...
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GithubAuthProvider.credentialFromError(error);
                    // ...
                });
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };

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

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate('/Login');
        }).catch((error) => {
            console.error("Error logging out:", error);
        });
    };
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            console.log("result==>", result);

        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };
    const [showHistory, setshowHistory] = useState(false)
    const [input, setinput] = useState('')
    const [message, setmessage] = useState([{ role: "system", content: 'Chat GPT' },])

    console.log('input', input);

    // const [data,setData]=useState(0);
    // console.log(data);


    const chatOpenAI = async () => {
        if (!input) return Swal.fire({
            title: 'warning',
            text: 'Please enter your prompt',
            icon: 'warning',
            confirmButtonText: 'Ok'
        })

        setLoading(true);
        message.push({ role: "user", content: input, })

        setinput('');

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: message,
            //  [
            //   { role: "system", content: "You are a helpful assistant." },
            //   {
            //     role: "user",
            //     content:'what is mern',
            //   },
            // ],
        });
        message.push(completion.choices[0].message)
        console.log(completion.choices[0].message);

        setmessage([...message])
        setLoading(false);



    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setmessage('');
        }
    };
    return (
        <>
            <section className="main-container">
                <nav className='navbar'>
                    <div className="slider">
                        <div className='logos'>
                            <FaSlidersH size={25} color='gray' />
                        </div>
                        <div>
                            <BsPencilSquare color='gray' size={25} />
                        </div>
                    </div>




                    <div className="login">
                    {user ? (
            <div className="sign-btn flex justify-center items-center ml-2 px-4 h-auto w-auto py-1 bg-[#171717] text-sm font-bold text-black rounded-3xl">
              <img src={user.photoURL} className="rounded-full w-10 h-10 mr-2" alt="User Profile" />
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="sign-btn flex justify-center items-center ml-2 py-3 px-4 h-auto w-auto py-2 bg- text-sm font-bold text-black rounded-3xl hover:text-gray-200">
              <button>
                <Link to='/Login'>Sign in</Link>
              </button>
            </div>
)}

                    </div>

                </nav>
                {showHistory && <div className='slider1' >
                    <h2>hello bahi</h2>
                </div>}
                <div className="main-chat-container">

                    <div className="mychat-container">
                        <section className='message-container'>


                            <Chat message={message} loading={loading} />

                        </section>
                        <section className='input-section'>
                            <MdAddLink className=' addimage' size={26} color='white' />

                            <input type="text" value={input} placeholder='enter your prompt'
                                onChange={(e) => setinput(e.target.value)}
                            />
                            <FaArrowUp className='icons-chat' onClick={chatOpenAI} color='white' />


                        </section>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home