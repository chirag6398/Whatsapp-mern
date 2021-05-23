const getRoomMessages = async (roomName) => {
  try {
    const res = await fetch("/api/user/messages/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomName }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default getRoomMessages;
