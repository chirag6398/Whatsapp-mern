import React, { useState, useEffect } from "react";
import sidebarchatStyle from "../styles/sidebarchats.module.css";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider/Stateprovider";
export default function Sidebarchats({ addNewChat, name, id }) {
  const [seed, setSeed] = useState("");
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = async () => {
    const roomName = prompt("Please enter name of chat room");

    if (roomName) {
      try {
        let userRoom = { userName: state.user, roomName: roomName };
        const res = await fetch("http://localhost:5000/api/user/room/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userRoom),
        });
        const data = await res.json();
        console.log(data);
        if (data.status === 200) {
          console.log("user roomname added successfully");
          dispatch({ type: "ADD_ROOM", payload: roomName });
        } else {
          console.log("userName not added");
        }
      } catch (err) {
        console.log("failed to pst");
      }
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
