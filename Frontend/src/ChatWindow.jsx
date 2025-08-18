import React from 'react'
import "./ChatWindow.css"
import Chat from "./Chat.jsx"
import { MyContext } from "./MyContext.jsx"
import { useContext, useState, useEffect } from "react"
import {RingLoader} from "react-spinners"

const ChatWindow = () => {
  const {prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats} = useContext(MyContext);
  const [loding, setLoding] = useState(false);
  const getReply = async () => {
    setLoding(true);
    const options = {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      })
    };
    try {
      const response = await fetch("http://localhost:8000/api/chat", options);
      const res = await response.json();
      console.log(res);
      setReply(res.reply);
    } catch (error) {
      console.log(error);
    }
    setLoding(false);
  };

  useEffect(() => {
    if (prompt &&reply) {
      setPrevChats (prevChats => [...prevChats, 
        {
          role: "user",
          content: prompt, 
        },
        {
          role: "assistant",
          content: reply
        }]);
    }
    setPrompt("");
  }, [reply]);

  return (
    <div className='chatWindow'>
      <div className='navbar'>
        <span>Nexa AI<i className="fa-solid fa-chevron-down"></i></span>
        <div className='userIconDiv'>
          <span className='userIcon'><i className="fa-solid fa-user"></i></span>
        </div>
      </div>
    
      <Chat/>

      <RingLoader color='#84c2fcff' loading={loding}></RingLoader>

      <div className='chatInput'>
        <div className='inputBox'>
          <input type="text" placeholder='Ask Anything'  value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => e.key === 'Enter' ? getReply(): ''}/>
          <div id='submit' onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
        </div>
        <p className='info'>Nexa AI can help you with anything. You can ask any question.</p>
      </div>
    </div>
  )
}

export default ChatWindow   