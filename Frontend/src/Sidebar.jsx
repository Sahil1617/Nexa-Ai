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
        <p>All Rights Reserved by Nexa AI &copy; 2025</p>
        <p>Developed by<i className="fa-solid" style={{width: "140px"}}>S a h i l &nbsp;J a d h a v</i></p>
      </div>

    </section>
  )
}

export default Sidebar


