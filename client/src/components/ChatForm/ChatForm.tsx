import * as React from "react";
import { useContext } from "@lib/context";
import { socket } from "@lib/socket";
import classes from "./chatform.module.css";

export const ChatForm = () => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [message, setMessage] = React.useState("");
  const { username } = useContext();

  React.useEffect(() => {
    if (username && inputRef.current) {
      inputRef.current.focus();
    }
  }, [username]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit("newMessage", { content: message.trim(), username });

    setMessage("");
    // set focus back onto the input element
    inputRef.current?.focus();
  }

  return (
    <div className={classes.chatFormContainer}>
      <form onSubmit={onSubmit} className={classes.chatForm}>
        <input
          ref={inputRef}
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          className={classes.chatFormInput}
          placeholder="Enter message"
        />

        <button disabled={!username || !message.trim()} className={classes.chatFormSubmit} type="submit">
          Send
        </button>
      </form>

      {username ? <p>Chatting as {username}</p> : null}
    </div>
  );
};
