import * as React from "react";
import { socket } from "./lib/socket";
import { Chat } from "./components/Chat/Chat";
import { Context } from "./lib/context";

function App() {
  const [username, setUsername] = React.useState<string | null>("");

  React.useEffect(() => {
    if (!username?.trim()) {
      const value = prompt("Please enter a username");

      if (value) {
        setUsername(value);
        socket.emit("joined", value);
      }
    }
  }, [username]);

  return (
    <div className="app-container">
      <Context.Provider value={{ username, setUsername }}>
        <Chat />
      </Context.Provider>
    </div>
  );
}

export default App;
