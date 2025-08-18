import React from 'react'
import "./Chat.css"
import { useContext } from 'react'
import { MyContext } from './MyContext.jsx'

const Chat = () => {
  const {newChat, prevChats} = useContext(MyContext);
  return (
    <>
      {newChat && <h1>Start the new conversation!!</h1>}
      <div className='chats'>
        <div className="userDiv">
          <p className='userMessage'></p>
        </div>
        <div className='gptDiv'>
          <p className='gptMessage'></p>
        </div>
      </div>
    </>
  )
}

export default Chat   