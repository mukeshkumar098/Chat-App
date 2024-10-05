import React from 'react'
import './Chat.css'
import parse from 'html-react-parser';
import {marked} from 'marked'

function Chat({message,loading}) {
  console.log(message);
  
  return (
   <>
    <div className='mychat-section  h-50 w-full overflow-scroll'>
      {message.map((ele)=>{ 
        return<>
         <div className={ele.role=='user'? "user-data":'chatGpt'}>{ele.role ==='user' ? '':<img src="/public/logo3.jpg" alt=""/>}{ele?.content && parse( marked(ele.content))}</div>
        </>
      })}
      {loading && <div className='flex items-center justify-start w-full '> <span className="loading loading-dots loading-lg "></span></div>}
     
    </div>
    {/* <button onClick={()=>setData(data+1)}>Add</button> */}
   </>
  )
}

export default Chat