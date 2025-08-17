import "./App.css";
import Sidebar from "./Sidebar";
import Chats from "./Chats";
import ChatWindow from "./ChatWindow";
import {MyContext} from "./MyContext";

function App() {
    const providerValues = {};
    return (
        <div className="app">
            <MyContext.Provider value={providerValues}>
                <Sidebar />
                <ChatWindow />
            </MyContext.Provider>
        </div>
    );
}

export default App;