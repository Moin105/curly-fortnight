import React,{useState,useEffect} from 'react'
import './styles.css'
import Header from '../../Components/Header/Header'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
function Signup() {

const dispatch = useDispatch()
const [username, setUsername] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const sendSignup = async () => {
  const data = {
    username: username,
    email: email,
    password: password
  }
  const response = await axios.post("http://localhost:5000/api/auth/signup", data)

}



  return (
    <div className="signup-page">
    <Header />
    <div className="signup-page-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <input type="text" placeholder="Enter your email or phone number" />
        <input type="text" placeholder="Enter Your Username" />
        <input type="password" placeholder="Enter Password" />
        <Link to="/"><button>Signup</button></Link>
        <p>Already Have an account? 
        <Link to="/"><span>Login</span></Link>  
        </p>
      </div>
    </div>
  </div>
  )
}

export default Signup