import * as React from "react";
import classes from "./chat.module.css";
import { ChatMessage } from "../ChatMessage/ChatMessage";
import { ChatForm } from "../ChatForm/ChatForm";
import { Message } from "../../interfaces/Message";
import { socket } from "../../lib/socket";
import { useContext } from "../../lib/context";

export const Chat = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const { username, setUsername } = useContext();

  React.useEffect(() => {
    if (!username) return;

    setMessages([
      {
        content: "Welcome to this chat app!",
        date: Date.now(),
        username: "System",
      },
    ]);
  }, [username]);

  React.useEffect(() => {
    const handler = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("newMessage", handler);

    return () => {
      socket.off("newMessage", handler);
    };
  }, []);

  function promptUsername() {
    const value = prompt("Please enter a username");

    setUsername(value);
  }

  return (
    <div className={classes.chatContainer}>
      <div className={classes.chat}>
        <div>
          <div className={classes.chatHeader}>
            <h1>Simple Vite chat app with socket.io</h1>
          </div>

          <div className={classes.chatMessages}>
            {!username ? (
              <button onClick={promptUsername} className={classes.setUsernameBtn}>
                Set a username before continuing
              </button>
            ) : null}

            {messages.map((message) => (
              <ChatMessage key={message.date} message={message} />
            ))}
          </div>
        </div>

        <ChatForm />
      </div>
    </div>
  );
};
