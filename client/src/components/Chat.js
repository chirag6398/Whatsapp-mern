import React, { useEffect, useState, useRef } from "react";
import chatStyle from "../styles/chat.module.css";
import AttachFile from "@material-ui/icons/AttachFile";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVert from "@material-ui/icons/MoreVert";
import SearchOutLined from "@material-ui/icons/SearchOutlined";
import MicIcon from "@material-ui/icons/MicNoneOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import { useParams } from "react-router-dom";
import { useStateValue } from "../StateProvider/Stateprovider";

export default function Chat() {
  const [state] = useStateValue();
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const divRef = useRef(null);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  let currRoom = state.rooms.filter((e) => e.id === roomId);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    let obj = { message: input, name: "temprary" };
    setMessages([...messages, obj]);
    setInput("");
  };
  return (
    <div className={chatStyle.chat_container}>
      <div className={chatStyle.chat_header}>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className={chatStyle.header_info}>
          <h3>{currRoom[0]?.name}</h3>
          <p>Last seen at{new Date().toLocaleTimeString()}</p>
        </div>
        <div className={chatStyle.header_right}>
          <IconButton>
            <SearchOutLined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className={chatStyle.chat_body}>
        {messages.map((message, i) => {
          return (
            <div key={i}>
              <p className={`${chatStyle.message} ${chatStyle.receiver}`}>
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "13px",
                    marginBottom: "5px",
                  }}
                >
                  {message.name}
                </span>
                {message.message}
                <span
                  style={{
                    opacity: "0.5",
                    fontSize: "small",
                    fontWeight: "600",
                    marginLeft: "10px",
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                >
                  4:00 pm
                </span>
              </p>
              <div ref={divRef} />
            </div>
          );
        })}
      </div>
      <div className={chatStyle.chat_footer}>
        <SentimentVerySatisfiedIcon style={{ color: "gray" }} />
        <form>
          <input
            type="text"
            value={input}
            onChange={inputHandler}
            placeholder="enter yor message..."
          />
          <button type="submit" onClick={sendMessage}></button>
        </form>

        <MicIcon style={{ color: "gray" }} />
      </div>
    </div>
  );
}
// className={`${chatStyle.message} ${
// message.name === user.displayName && chatStyle.receiver
// }`}
