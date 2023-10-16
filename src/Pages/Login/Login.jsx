import React from "react";
import "./styles.css";
import Header from "../../Components/Header/Header";
import {Link} from 'react-router-dom'
function Login() {
  return (
    <div className="login-page">
      <Header />
      <div className="login-page-container">
        <div className="login-form">
          <h2>Login</h2>
          <input type="text" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <Link to="/resources">   <button>Login</button></Link>
          <p>Don’t have an account? 
           <Link to="/signup"><span>Sign up</span></Link> 
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
