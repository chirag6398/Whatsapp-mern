import { Button } from "@material-ui/core";
import React from "react";
// import { auth, provider } from "../../firebase/Firebase";
import loginStyle from "../../styles/login.module.css";
// import { useStateValue } from "../../StateProvider/Stateprovider";
export default function Login() {
  // const [{ user }, dispatch] = useStateValue();
  const signin = () => {
    // if (!user) {
    //   auth
    //     .signInWithPopup(provider)
    //     .then((res) => {
    //       dispatch({
    //         type: "SET_USER",
    //         user: res.user,
    //       });
    //       // console.log(res);
    //     })
    //     .catch((err) => {
    //       alert(err.message);
    //     });
    // }
  };
  return (
    <div className={loginStyle.login_extdiv}>
      <div className={loginStyle.login_container}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_j6zKHu8BEYzvw9sK3O5kVj2jE5xA0NNdYw&usqp=CAU"
          alt="..."
        />
        <h2>Sign In to Whatsapp</h2>
        <Button onClick={signin}>Sign In with google</Button>
      </div>
    </div>
  );
}
