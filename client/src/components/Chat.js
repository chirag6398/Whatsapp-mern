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
import getRoomMessages from "../services/getRoomMessages";

export default function Chat() {
  const [state, dispatch] = useStateValue();
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  // const [messages, setMessages] = useState(state.);
  const divRef = useRef(null);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };
  let currRoom = state.rooms.filter((e) => e._id === roomId);

  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.messages]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const getMessages = async () => {
    const data = await getRoomMessages(currRoom[0]?.roomName);
    if (data.status === 200) {
      dispatch({ type: "ROOM_MESSAGES", payload: data.data });
    }
  };
  useEffect(() => {
    getMessages();
  }, [state.messageTriger, roomId]);

  const sendMessage = async (e) => {
    try {
      e.preventDefault();

      let hr = new Date().getHours();
      let min = new Date().getMinutes().toLocaleString();
      let curTime = undefined;
      if (hr === 24) {
        curTime = "00" + ":" + min + " am";
      } else if (hr >= 12) {
        curTime = (hr % 12) + ":" + min + " pm";
      } else if (hr < 12) {
        curTime = hr + ":" + min + " am";
      }

      const res = await fetch("/api/user/message/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: state.user,
          message: input,
          time: curTime,
          room: currRoom[0]?.roomName,
        }),
      });
      const data = await res.json();

      if (data.status === 200) {
        dispatch({ type: "MESSAGE_TRI", payload: !state.messageTriger });

        setInput("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={chatStyle.chat_container}>
      <div className={chatStyle.chat_header}>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className={chatStyle.header_info}>
          <h3>{currRoom[0]?.roomName}</h3>
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
        {state.messages?.map((message, i) => {
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
                  {message.time}
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
