import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "../../Components/Header/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CreateUser() {
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
//   const error = useSelector((state) => state.userAuth?.errors?.error?.errors);

const [error, setError] = useState(null)
  const token = useSelector((state) => state.userAuth.token);
  const API_ENDPOINT = "http://23.22.32.42/api";
  const handleSignUp = async () => {
    if (!username || !email || !password) {
      return toast.error("Please fill all the fields");
    } else if (password.length < 6) {
      return toast.error("Password must be 6 characters long");
    } else if (isValidEmail(email) === false) {
      return toast.error("Invalid Email");
    } else if (username.length < 3) {
      return toast.error("Username must be 3 characters long");
    } else {
      try {
        const response = await axios.post(
          `${API_ENDPOINT}/users`,
          { user_name: username, email: email, password: password },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const data = response.data;
        console.log("user created", data);
  
        if (data.status === 201) {
          toast.success(data.message);
          navigate("/users");
        }
      } catch (error) {
        if (error.response) {
        
            // Other error handling for different status codes
            toast.error("An error occurred. Please try again.");
            // console.log("error",error.response.data.errors)
            setError(error.response.data.errors);
                  } else {
          toast.error("An error occurred. Please try again.");
        }
        console.error("error", error);
      }
    }
  };
  
  useEffect(() => {
    console.log("error", error);
    for (const key in error) {
      if (error[key].length > 0) {
        toast.error(error[key][0]);
      }
    }
  }, [error]);


  return (
    <div className="user-create-page">
      <ToastContainer />
      <Header />
      <div className="user-create-page-container">
        <div className="user-create-form">
          <h2>Create User</h2>
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
          Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
