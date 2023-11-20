import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "../../Components/Header/Header";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimeRangePicker from "./TimeRange";
function CreateShift() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const {id} = useParams()
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [status,setStatus ]=useState('')
  const baseUrl = process.env.BASE_URL;
  const convertTimeFormat = (timeString) => {
    // Extract the HH:MM part from the given time string "HH:MM:SS"
    const hhmm = timeString.split(':').slice(0, 2).join(':');
    return hhmm;
  };
  
  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailPattern.test(email);
  };
  
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.userAuth.token);
  const API_ENDPOINT = "http://23.22.32.42/api";
  const user = useSelector((state) => state.authUser?.user);
  const loading = useSelector((state) => state.userAuth.loading);
  //   const error = useSelector((state) => state.userAuth?.errors?.error?.errors);
  const fetchShift = async () => {
    const response = await axios.get(`${API_ENDPOINT}/shifts/${id}`, {
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
    });
    const data = response.data;
    console.log("shift information", data);
    setName(data.shift.name)
    setStartTime(convertTimeFormat(data.shift.from))
    setEndTime(convertTimeFormat(data.shift.to))
    if (data.shift.status == 1) {
        setStatus(data.shift.status)
    }else {
        setStatus(data.shift.status)
    }
}
useEffect(() => {
  if(id){
    console.log("hiiiiii")
  
    fetchShift()
  }
}, [])
const updateShift = async () => {
    if (!name || !startTime || !endTime) {
      return toast.error("Please fill all the fields");
    }  else {
      try {
        const response = await axios.post(
          `${API_ENDPOINT}/shifts/${id}`,
          {_method:"put", name: name, from: startTime, to: endTime,status:status },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        console.log("user created", data);

        if (data.status === 200) {
          toast.success(data.message);
          navigate("/shifts");
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

   
 
    const handleSignUp = async () => {
      if (!name || !startTime || !endTime) {
        return toast.error("Please fill all the fields");
      }  else {
        try {
          const response = await axios.post(
            `${API_ENDPOINT}/shifts`,
            { name: name, from: startTime, to: endTime },
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
            navigate("/shifts");
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

  //   useEffect(() => {
  //     console.log("error", error);
  //     for (const key in error) {
  //       if (error[key].length > 0) {
  //         toast.error(error[key][0]);
  //       }
  //     }
  //   }, [error]);
  const handleStartTimeChange = (e) => {
    let inputTime = e.target.value;
    
    // Remove non-digit characters
    inputTime = inputTime.replace(/\D/g, '');
  
    // Limit the input to 4 characters (HHMM)
    inputTime = inputTime.slice(0, 4);
  
    // Ensure at least 4 characters for HHMM format
    while (inputTime.length < 4) {
      inputTime = '0' + inputTime;
    }
  
    // Limit the hours to 00-23 and minutes to 00-59
    const hours = Math.min(parseInt(inputTime.substring(0, 2)) || 0, 23);
    const minutes = Math.min(parseInt(inputTime.substring(2, 4)) || 0, 59);
  
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
    setStartTime(formattedTime);
  };
  
  // handleEndTimeChange function can be the same as handleStartTimeChange
  const handleEndTimeChange = (e) => {
    let inputTime = e.target.value;
    
    inputTime = inputTime.replace(/\D/g, '');
    inputTime = inputTime.slice(0, 4);
  
    while (inputTime.length < 4) {
      inputTime = '0' + inputTime;
    }
  
    const hours = Math.min(parseInt(inputTime.substring(0, 2)) || 0, 23);
    const minutes = Math.min(parseInt(inputTime.substring(2, 4)) || 0, 59);
  
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
    setEndTime(formattedTime);
  };
  
  return (
    <div className="shift-create-page">
      <ToastContainer />
      <Header />
      <div className="shift-create-page-container">
        <div className="shift-create-form">
          <h2>Create Shift</h2>
          <div className="input-box">
            <label>Enter Shift Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              value={name}
              placeholder="Enter Shift Name"
            />
          </div>
          <div className="row">
            <div className="input-box">
              <label>Enter Start Time</label>
              <input
                value={startTime}
                onChange={handleStartTimeChange}
                type="text"
                placeholder="Enter Start Time (HH:MM)"
              />
              {!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(startTime) &&
                startTime.length > 0 && (
                  <p style={{ color: "red" }}>
                    Please enter a valid time in the format HH:MM
                  </p>
                )}
            </div>
            <div className="input-box">
              <label>Enter End Time</label>
              <input
                value={endTime}
                onChange={handleEndTimeChange}
                type="text"
                placeholder="Enter End Time (HH:MM)"
              />
              {!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(endTime) &&
                endTime.length > 0 && (
                  <p style={{ color: "red" }}>
                    Please enter a valid time in the format HH:MM
                  </p>
                )}
            </div>
          </div>
      {id &&   <div className="input-box">
             <label>
                Shift Status
             </label>
             <button className="button" onClick={()=>{setStatus(!status)}} style={{background: status == 1 ? "#31BC01" : "#BC0101"}}>
               {status == 1 ? 'Active':'Inactive'}
             </button>
          </div>}
         {id ? <button onClick={updateShift}>Update</button> :<button onClick={handleSignUp}>Create</button>}
        </div>
      </div>
    </div>
  );
}

export default CreateShift;
