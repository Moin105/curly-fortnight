import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "../../Components/Header/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import DateRangePicker from "./DateRangePicker";
import { useNavigate } from "react-router-dom";
import { applicationUser } from "../../Redux/Slices/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Application() {
  const API_ENDPOINT = "http://23.22.32.42/api";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [className, setClassName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [references, setReferences] = useState("");
  const [driver, setDriver] = useState("");
  const [notes, setNotes] = useState("");
  const baseUrl = process.env.BASE_URL;
  const [startDate1, setStartDate1] = useState(null);
  const [endDate1, setEndDate1] = useState(null);
  const [startDate2, setStartDate2] = useState(null);
  const [endDate2, setEndDate2] = useState(null);
  const [startDate3, setStartDate3] = useState(null);
  const [endDate3, setEndDate3] = useState(null);
  const [startDate4, setStartDate4] = useState(null);
  const [endDate4, setEndDate4] = useState(null);
  const [startDate5, setStartDate5] = useState(null);
  const [endDate5, setEndDate5] = useState(null);
  const [startDate6, setStartDate6] = useState(null);
  const [endDate6, setEndDate6] = useState(null);
  const [availabilityDays, setAvailabilityDays] = useState(null);
  const [availabilityStart, setAvailabilityStart] = useState(null);
  const [availabilityEnd, setAvailabilityEnd] = useState(null);
  const handleStartDateChange1 = (date) => {
    setStartDate1(date);
  };

  const handleEndDateChange1 = (date) => {
    setEndDate1(date);
  };

  const handleStartDateChange2 = (date) => {
    setStartDate2(date);
  };

  const handleEndDateChange2 = (date) => {
    setEndDate2(date);
  };
  const handleStartDateChange3 = (date) => {
    setStartDate3(date);
  };

  const handleEndDateChange3 = (date) => {
    setEndDate3(date);
  };
  const handleStartDateChange4 = (date) => {
    setStartDate4(date);
  };

  const handleEndDateChange4 = (date) => {
    setEndDate4(date);
  };
  const handleStartDateChange5 = (date) => {
    setStartDate5(date);
  };

  const handleEndDateChange5 = (date) => {
    setEndDate5(date);
  };
  const handleStartDateChange6 = (date) => {
    setStartDate6(date);
  };

  const handleEndDateChange6 = (date) => {
    setEndDate6(date);
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailPattern.test(email);
  };

  const user = useSelector((state) => state.authUser?.user);
  const loading = useSelector((state) => state.userAuth.loading);
  const error = useSelector((state) => state.userAuth?.errors?.error?.errors);
  const token = useSelector((state) => state.userAuth.token);

  useEffect(() => {
    console.log("error", error);
    for (const key in error) {
      if (error[key].length > 0) {
        toast.error(error[key][0]);
      }
    }
  }, [error]);
  const postApplication = async () => {
    const formData = new FormData();

    // Fill in the form data with your parameters
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("class", className)
    formData.append("address", address);
    formData.append("board_start", startDate1);
    formData.append("board_end", endDate1);
    formData.append("cpr_start", startDate2);
    formData.append("cpr_end", endDate2);
    formData.append("physical_start", startDate3);
    formData.append("physical_end", endDate3);
    formData.append("mmr_start", startDate4);
    formData.append("mmr_end", endDate4);
    formData.append("creminia_background_start", startDate5);
    formData.append("creminia_background_end", endDate5);
    formData.append("drung_test_start", startDate6);
    formData.append("drung_test_background_end", endDate6);
    formData.append("avalibility_day", availabilityDays);
    formData.append("avalibility_start", availabilityStart);
    formData.append("avalibility_end", availabilityEnd);
    formData.append("reference", references);
    formData.append("driver", driver);
    formData.append("notes", notes);

    try {
      const response = await axios.post(
        `${API_ENDPOINT}/job-applications`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Failed to submit data");
    }
  };
  return (
    <div className="application-page">
      <ToastContainer />
      <Header />
      <div className="application-page-container">
        <div className="application-form">
          <h2>Application</h2>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Your Name "
          />
          <input
            onChange={(e) => setClassName(e.target.value)}
            type="text"
            placeholder="Enter Your Class"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Your Email"
          />
          <input
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            placeholder="Enter Your Phone"
          />
          <input
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="Enter Your Address"
          />

          {/*  */}

          <DateRangePicker
            label={"Board"}
            selectedStartDate={startDate1}
            selectedEndDate={endDate1}
            onStartDateChange={handleStartDateChange1}
            onEndDateChange={handleEndDateChange1}
          />

          <DateRangePicker
            label={"CPR"}
            selectedStartDate={startDate2}
            selectedEndDate={endDate2}
            onStartDateChange={handleStartDateChange2}
            onEndDateChange={handleEndDateChange2}
          />

          <DateRangePicker
            label={"Physical"}
            selectedStartDate={startDate3}
            selectedEndDate={endDate3}
            onStartDateChange={handleStartDateChange3}
            onEndDateChange={handleEndDateChange3}
          />
          <DateRangePicker
            label={"MMR"}
            selectedStartDate={startDate4}
            selectedEndDate={endDate4}
            onStartDateChange={handleStartDateChange4}
            onEndDateChange={handleEndDateChange4}
          />
          <DateRangePicker
            label={"Crimina background"}
            selectedStartDate={startDate5}
            selectedEndDate={endDate5}
            onStartDateChange={handleStartDateChange5}
            onEndDateChange={handleEndDateChange5}
          />

          <DateRangePicker
            label={"drug test"}
            selectedStartDate={startDate6}
            selectedEndDate={endDate6}
            onStartDateChange={handleStartDateChange6}
            onEndDateChange={handleEndDateChange6}
          />
          <div className="helos">
            <h4>Availability</h4>
            <input
              type="number"
              placeholder="availability"
              onChange={(e) => {
                setAvailabilityDays(e.target.value);
              }}
            />
            <input
              type="date"
              onChange={(e) => {
                setAvailabilityStart(e.target.value);
              }}
            />
            <input
              type="date"
              onChange={(e) => {
                setAvailabilityEnd(e.target.value);
              }}
            />
          </div>

          {/*  */}
          <input
            onChange={(e) => setReferences(e.target.value)}
            type="text"
            placeholder="References"
          />
          <input
            onChange={(e) => setDriver(e.target.value)}
            type="text"
            placeholder="Enter Driver"
          />
          <textarea
            onChange={(e) => setNotes(e.target.value)}
            type="text"
            placeholder="Enter Notes"
          />
          <button
            onClick={() => {
              postApplication();
            }}
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Application;
