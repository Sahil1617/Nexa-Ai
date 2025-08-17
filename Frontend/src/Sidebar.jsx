import "./Sidebar.css"
import {useContext, useEffect} from "react";
import { MyContext } from "./MyContext.jsx";

const Sidebar = () => {
  return (
    <section className="sidebar">
      <button>
        <img src="src/assets/nexa.svg" alt="Nexa Ai" className="logo"/>
        <span><i className="fa-solid fa-pen-to-square"></i></span>
      </button>

      <ul className="history">
        <li>history1</li>
        <li>history1</li>
        <li>history1</li>
      </ul>

      <div className="sign">
        <p>By Sahil Jadhav &hearts;</p>
      </div>

    </section>
  )
}

export default Sidebar


