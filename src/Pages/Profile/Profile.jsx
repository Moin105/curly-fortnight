import React from 'react'
import './styles.css'
import { useSelector } from 'react-redux'
import { logoutUser } from '../../Redux/Slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Profile() {
    const user = useSelector((state) => state.userAuth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("user",user)
  return (
    <div>
    <h2>Profile</h2>
    <div className="profile-wrapper">
      {/* <img src={`http://23.22.32.42/storage/${profile.attachment}`}/> */}
      <p className="profile-text">Name: <span>{user?.name}</span></p>
      <p className="profile-text">Email: <span>{user?.email}</span></p>
      <p className="profile-text">Role : <span>{user?.roles[0]?.display_name}</span></p>
      <button className='logout' onClick={()=>{dispatch(logoutUser());navigate("/")}}>Logout</button>
    </div>
  </div>
  )
}

export default Profile