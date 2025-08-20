import React from 'react'
import "./ChatWindow.css"
import Chat from "./Chat.jsx"
import { MyContext } from "./MyContext.jsx"
import { useContext, useState, useEffect } from "react"
import {ScaleLoader} from "react-spinners"

const ChatWindow = () => {
  const {prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats, setNewChat} = useContext(MyContext);
  const [loding, setLoding] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () => {
    setLoding(true);
    setNewChat(false);
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
      const response = await fetch("https://nexabackend-c1s7.onrender.com/api/chat", options);
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

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className='chatWindow'>
      <div className='navbar'>
        <span>Nexa AI<i className="fa-solid fa-chevron-down"></i></span>
        <div className='userIconDiv' onClick={handleProfileClick}>
          <span className='userIcon'><i className="fa-solid fa-user"></i></span>
        </div>
      </div>

      {
        isOpen && 
        <div className='dropDown'>
          <div className="dropDownItem">Upgrade Plan <i class="fa-solid fa-cloud-arrow-up"></i></div>
          <div className="dropDownItem">Settings <i class="fa-solid fa-gear"></i></div>
          <div className="dropDownItem">Login <i class="fa-solid fa-arrow-right-from-bracket"></i></div>
        </div>
      }

      <Chat/>

      <ScaleLoader color='#84c2fcff' loading={loding}></ScaleLoader>

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