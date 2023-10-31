import React,{useState,useEffect} from 'react'
import { ToastContainer } from 'react-toastify'
import Layout from '../../Layout/Layout'
import { useSelector } from 'react-redux'
import './activity.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
function ActivityLogDetail() {
  const [activity,setActivity] = useState([])
  const token = useSelector((state) => state.userAuth.token);
  const {id} = useParams()
  const API_ENDPOINT = "http://23.22.32.42/api";
  const getActivitiesData =async ()=>{
    const response = await axios.get(`${API_ENDPOINT}/activities-by-user-id/${id}`,{
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
  
  return (
    <div className="activity-page">
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
                <tr>
                    <td className="long">wefwefewfwe</td>
                    <td>wefwefwefwe</td>
                    <td>qwe3 32423</td>
                </tr>
                </tbody>
              </table>
  </div>
</div>
</div>
  )
}

export default ActivityLogDetail