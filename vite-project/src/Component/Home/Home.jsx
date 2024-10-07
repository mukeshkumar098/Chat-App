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
import '../Chat.css'

import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { FaSquare } from "react-icons/fa";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });
function Home() {
    const [user, setUser] = useState(null);
    const [input, setinput] = useState('')
    const [message, setmessage] = useState([{ role: "system", content: 'ChatMK' },])
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    // const auth=getAuth();
    console.log('input', input);
    const chatOpenAI = async () => {
        if (!input) return Swal.fire({
            title: 'warning',
            text: 'Please enter your prompt',
            icon: 'warning',
            confirmButtonText: 'Ok'
        })
        message.push({ role: "user", content: input, })
        setLoading(true);
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            setmessage('');
        }
    };
    return (
        <>
            <section className="main-container w-full bg-#212121">
                <nav className='navbar h-8 w-full flex justify-item-center '>
                    <div className="slider w-20 flex gap-6 ">
                        <div className='logos ml-4'>
                            <FaSlidersH size={25} color='gray' />
                        </div>
                        <div>
                            <BsPencilSquare color='gray' size={25} />
                        </div>
                    </div>
                    <div className="login  flex items-center gap-3 mr-7">
                        {user ? (
                            <div className="sign-btn flex justify-center items-center ml-2 px-4 h-auto w-auto py-1 bg-[#171717] text-sm font-bold text-black rounded-3xl">
                                <img src={user.photoURL} className="rounded-full w-10 h-10 mr-2" alt="User Profile" />
                                <button className='color-gray' onClick={handleLogout}>Logout</button>
                            </div>
                        ) : (
                            <div className="sign-btn flex justify-center items-center ml-2 py-3 px-4 h-auto w-auto py-2 bg- text-sm font-bold text-black rounded-3xl bg-[#2F2F2F] hover:text-gray-200">
                                <button>
                                    <Link to='/Login'>Sign in</Link>
                                </button>
                            </div>
                        )}

                    </div>
                </nav>
                <div className="main-chat-container flex justify-center w-full ">
                    <div className="mychat-container h-full">
                        <section className='message-container p-1 flex flex-col'>
                            <Chat message={message} loading={loading} />
                        </section>
                        <section className='input-section flex bg-[#2F2F2F] items-center mb-4 b-2'>
                            <MdAddLink className=' addimage border-none cursor-pointer ml-4 bg-[#2F2F2F]' size={26} color='white' />
                            <input type="text" value={input} placeholder='enter your prompt'
                                onChange={(e) => setinput(e.target.value)}/>
                            <FaArrowUp className='icons-chat' onClick={chatOpenAI} color='white' />
                        </section>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home