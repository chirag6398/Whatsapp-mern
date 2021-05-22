import React, { useState, useEffect } from "react";
import sidebarchatStyle from "../styles/sidebarchats.module.css";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider/Stateprovider";
export default function Sidebarchats({ addNewChat, name, id }) {
  const [seed, setSeed] = useState("");
  const [state, dispatch] = useStateValue();
  // const [message, setMessage] = useState([]);
  if (false) {
    console.log(state);
  }
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name of chat room");
    if (roomName) {
      dispatch({ type: "ADD_ROOM", payload: roomName });
    }
  };
  return !addNewChat ? (
    <Link to={`/${id}`}>
      <div className={sidebarchatStyle.sidebarchat_Container}>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className={sidebarchatStyle.chat_info}>
          <h3 style={{ margin: "0px" }}>{name}</h3>
          {/* <p style={{ margin: "0px" }}>{message[0]?.message}</p> */}
        </div>
      </div>
    </Link>
  ) : (
    <div
      onClick={createChat}
      className={sidebarchatStyle.sidebarchat_Container}
    >
      <h2>Add new chat</h2>
    </div>
  );
}
