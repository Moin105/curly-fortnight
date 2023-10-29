import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "../../Components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { loginUser } from "../../Redux/Slices/authSlice";

import "react-toastify/dist/ReactToastify.css";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.userAuth.token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailPattern.test(email);
  };
  const handleSignUp = () => {
    if (!email || !password) {
      return toast.error("Please fill all the fields");
    } else if (password.length < 6) {
      return toast.error("Password must be 6 characters long");
    } else if (isValidEmail(email) == false) {
      console.log(isValidEmail(email));
      return toast.error("Invalid Email");
    } else {
      dispatch(
        loginUser({
          email: email,
          password: password,
        })
      );
    }
    console.log("error", error);
  };
  const user = useSelector((state) => state.userAuth);
  const loading = useSelector((state) => state.userAuth.loading);
  const error = useSelector((state) => state.userAuth?.errors?.error?.errors);
 
  useEffect(() => {
    console.log("error", error);
    for (const key in error) {
      if (error[key].length > 0) {
        toast.error(error[key][0]);
      }
    }
  }, [error]);
  useEffect(() => {
    console.log("user",user)
    if(token === null){
      return 
    }else{
        navigate("/resources")
    }
  }, [token])
  return (
    <div className="login-page">
          <ToastContainer />
      <Header />
      <div className="login-page-container">
        <div className="login-form">
          <h2>Login</h2>
          <input type="text" placeholder="Email"  onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}/>
          {/* <Link to="/resources"> */}
            {" "}
            <button  onClick={handleSignUp}>
            {loading === 'pending' ? 'Logging In...' : 'Login'} 
            </button>
          {/* </Link> */}
          <p>
            Don’t have an account?
            <Link to="/signup">
              <span>Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
