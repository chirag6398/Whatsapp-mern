const getData = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/user/getData", {
      method: "GET",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      //   credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if (data.status === 400) {
      return false;
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};
export default getData;
