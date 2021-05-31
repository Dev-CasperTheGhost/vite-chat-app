import * as React from "react";
import format from "date-fns/format";
import { Message } from "../../interfaces/Message";
import classes from "./chat-message.module.css";
import { useContext } from "@lib/context";

interface Props {
  message: Message;
}

export const ChatMessage = ({ message }: Props) => {
  const { username } = useContext();

  return (
    <div className={classes.chatMessage}>
      <header className={classes.chatMessageHeader}>
        <p>{message.username === username ? `You (${username})` : message.username}</p>
        <span>-</span>
        <span title={format(message.date, "yyyy MMM dd, HH:mm:ss")}>{format(message.date, "HH:mm")}</span>
      </header>

      <p className={classes.chatMessageText}>{message.content.toString()}</p>
    </div>
  );
};
