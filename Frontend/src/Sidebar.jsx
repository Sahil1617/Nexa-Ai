import "./Sidebar.css"
import {useContext, useEffect} from "react";
import { MyContext } from "./MyContext.jsx";
import {v1 as uuidv1} from "uuid";

const Sidebar = () => {
  const {allThreads, setAllThreads, currThreadId, setCurrThreadId, setNewChat, setPrompt, setReply, setPrevChats} = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/thread");
      const res = await response.json();
      
      const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title})); 
      setAllThreads(filteredData);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]) 


  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  } 

  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);

    try {
      const response = await fetch(`http://localhost:8000/api/thread/${newThreadId}`);
      const res = await response.json();
      setPrevChats(res);
      setNewChat(false);
      setReply(null);

    } catch (error) {
      console.log(error);
    }
  }

  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/thread/${threadId}`, {method: "DELETE"});
      const res = await response.json();
      console.log(res);
      getAllThreads();

      if(threadId === currThreadId){
        createNewChat();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="sidebar">
      <button onClick={createNewChat}>
        <img src="src/assets/nexa.svg" alt="Nexa Ai" className="logo"/>
        <span><i className="fa-solid fa-pen-to-square"></i></span>
      </button>

      <ul className="history">
        {
          allThreads?.map((thread, idx) => (
            <li key={idx} onClick={(e) => changeThread(thread.threadId)}
            className={thread.threadId === currThreadId ? "highlighted" : ""}
            >
              {thread.title}&nbsp;<i class="fa-solid fa-trash" onClick={(e) => {
                e.stopPropagation();
                deleteThread(thread.threadId);
                }}></i>
            </li>
          ))  
        }
      </ul>

      <div className="sign">
        <p>All Rights Reserved by Nexa AI &copy; 2025</p>
        <p>Developed by<i className="fa-solid" style={{width: "140px"}}>S a h i l &nbsp;J a d h a v</i></p>
      </div>

    </section>
  )
}

export default Sidebar


