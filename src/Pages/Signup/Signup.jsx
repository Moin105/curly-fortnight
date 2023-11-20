import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "../../Components/Header/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../Redux/Slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const baseUrl = process.env.BASE_URL;
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailPattern.test(email);
  };

const user = useSelector((state) => state.authUser?.user);
const loading = useSelector((state) => state.userAuth.loading);
const error = useSelector((state) => state.userAuth?.errors?.error?.errors);
const token = useSelector((state) => state.userAuth.token);

const handleSignUp = () => {
  if (!username || !email || !password) {
    return toast.error("Please fill all the fields");
  } else if (password.length < 6) {
    return toast.error("Password must be 6 characters long");
  } else if (isValidEmail(email) == false) {
    console.log(isValidEmail(email));
    return toast.error("Invalid Email");
  } else if (username.length < 3) {
    return toast.error("Username must be 3 characters long");
  } else {
  dispatch(signupUser({ user_name: username,
        email: email,
         password: password,}));
};
console.log("error",error)

}
useEffect(() => {
  console.log("error",error)
  for (const key in error) {
    if (error[key].length > 0) {
      toast.error(error[key][0]);
    }
  }
}, [error])


useEffect(() => {
  console.log("user",user)
  if(token === null){
    return 
  }else{
      navigate("/sections")
  }
}, [token])

  return (
    <div className="signup-page">
      <ToastContainer />
      <Header />
      <div className="signup-page-container">
        <div className="signup-form">
          <h2>Sign Up</h2>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter your email "
          />
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter Your Username"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
          />
          <button onClick={handleSignUp}>
          {loading === 'pending' ? 'Signing Up...' : 'SignUp'}            
            </button>
          <p>
             {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
            Already Have an account?
            <Link to="/">
              <span>Login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
