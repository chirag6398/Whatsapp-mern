import React, { useState, useEffect } from "react";
import "../../styles/login.css";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
// import { useHistory } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import { useStateValue } from "../../StateProvider/Stateprovider";
export default function Login() {
  const [state, dispatch] = useStateValue();
  const [showPassword, setShowPassword] = useState(false);
  const [showCpassword, setShowCpassword] = useState(false);
  const [proccesing, setProcessing] = useState(false);
  const [successed, setSuccessed] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    cpassword: "",
    name: "",
  });
  const showPasswordHandle = () => {
    setShowPassword(!showPassword);
  };
  const showPasswordHandle2 = () => {
    setShowCpassword(!showCpassword);
  };
  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      setProcessing(true);
      console.log(user);
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();

      console.log(data);
      if (data.status === 500 || data.status === 400 || !data) {
        window.alert("invalid credentials");
      } else {
        setProcessing(false);
        setSuccessed(true);
        dispatch({ type: "USER", payload: user.name });
        dispatch({ type: "USER_LOGINED", payload: true });
      }
    } catch (err) {
      setProcessing(false);
      console.log(err);
    }
  };

  return (
    <div className="login__extDiv">
      <div className="login__centerDiv">
        <div className="login__leftSide">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_j6zKHu8BEYzvw9sK3O5kVj2jE5xA0NNdYw&usqp=CAU"
            alt="..."
          />
        </div>
        <div className="login__rightSide">
          <h2>sign in</h2>
          <form method="POST" onSubmit={submitHandler}>
            <div className="login__formField">
              <div className="login__fieldCloser">
                <label>
                  <PersonIcon />
                </label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={inputHandler}
                  placeholder="user name"
                />
              </div>
            </div>
            <div className="login__formField">
              <div className="login__fieldCloser">
                <label>
                  <EmailIcon />
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={inputHandler}
                  placeholder="Your Email"
                />
              </div>
            </div>
            <div className="login__formField">
              <div className="login__fieldCloser login__password">
                <label>
                  <LockIcon />
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={inputHandler}
                  placeholder="Password"
                />
                {showPassword ? (
                  <VisibilityIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      showPasswordHandle();
                    }}
                  />
                ) : (
                  <VisibilityOffIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      showPasswordHandle();
                    }}
                  />
                )}
              </div>
            </div>
            <div className="login__formField">
              <div className="login__fieldCloser login__password">
                <label>
                  <LockIcon />
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="cpassword"
                  value={user.cpassword}
                  onChange={inputHandler}
                  placeholder="Confirm Password"
                />
                {showCpassword ? (
                  <VisibilityIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      showPasswordHandle2();
                    }}
                  />
                ) : (
                  <VisibilityOffIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      showPasswordHandle2();
                    }}
                  />
                )}
              </div>
            </div>
            <div className="login__formField">
              <button type="submit" className="login__submitButton">
                {proccesing ? (
                  <span>proccesing</span>
                ) : successed ? (
                  <span>successful</span>
                ) : (
                  <span>Register</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// import { Button } from "@material-ui/core";
// import React from "react";
// // import { auth, provider } from "../../firebase/Firebase";
// import loginStyle from "../../styles/login.module.css";
// // import { useStateValue } from "../../StateProvider/Stateprovider";
// export default function Login() {
//   // const [{ user }, dispatch] = useStateValue();
//   const signin = () => {
//     // if (!user) {
//     //   auth
//     //     .signInWithPopup(provider)
//     //     .then((res) => {
//     //       dispatch({
//     //         type: "SET_USER",
//     //         user: res.user,
//     //       });
//     //       // console.log(res);
//     //     })
//     //     .catch((err) => {
//     //       alert(err.message);
//     //     });
//     // }
//   };
//   return (
//     <div className={loginStyle.login_extdiv}>
//       <div className={loginStyle.login_container}>
//         <img
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_j6zKHu8BEYzvw9sK3O5kVj2jE5xA0NNdYw&usqp=CAU"
//           alt="..."
//         />
//         <h2>Sign In to Whatsapp</h2>
//         <Button onClick={signin}>Sign In with google</Button>
//       </div>
//     </div>
//   );
// }
