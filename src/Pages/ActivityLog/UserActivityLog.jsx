import React,{useState,useEffect} from 'react'
import { ToastContainer } from 'react-toastify'
import Layout from '../../Layout/Layout'
import { useSelector } from 'react-redux'
import './activity.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackHeader from '../../Components/Header/BackHeader'
function UserActivityLog() {
  const [activity,setActivity] = useState([])
  const UserId = useSelector((state) => state.userAuth.user.id);
  console.log("user00000",UserId)
  const token = useSelector((state) => state.userAuth.token);
  const {id} = useParams()
  const API_ENDPOINT = "https://api.upscalemsgroup.com/api";
  const getActivitiesData =async ()=>{
    const response = await axios.get(`${API_ENDPOINT}/activities-by-user-id/${UserId}`,{
      headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    const data = response.data
    console.log("activities",data)
    setActivity(data?.activities)
  }
  useEffect(() => {
   getActivitiesData()
  }, [])
  function getDate(dateTimeString) {
    const dateObj = new Date(dateTimeString);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month as it starts from 0
    const day = dateObj.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // Function to extract the time
  function getTime(dateTimeString) {
    const dateObj = new Date(dateTimeString);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const seconds = dateObj.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
  return (
    <Layout>
    <div className="activity-user-page">
      {/* <BackHeader link="/activitylog"/> */}
    <ToastContainer />
<div className="activity-container">
  <div className="activity-form">
  <table class="blueTable">
                <thead>
                  <tr>
                    
                    <th className="long">Activity </th>
                    <th>Date </th>
                    <th >time</th>

                  </tr>
                </thead>
                <tbody>
                {
  activity && activity.length === 0 ? (
    <tr>
      <td colSpan="3">No activities to display</td>
    </tr>
  ) : (
    activity?.map((active,index) => {
      return (
        <tr key={index}>
          <td className='long'>{active.description}</td>
          <td>{getDate(active.created_at)}</td>
          <td>{getTime(active.created_at)}</td>
        </tr>
      );
    })
  )
}

                </tbody>
              </table>
  </div>
</div>
</div>
    </Layout>
  )
}

export default UserActivityLog