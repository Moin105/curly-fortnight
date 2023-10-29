import React, { useState,useEffect } from "react";
import "./modald.css";
import axios from "axios";
import { useSelector } from "react-redux";


const YourModal = ({ closeModal,id,update }) => {
  const [users, setUsers] = useState(null);
  const [shifts, setShifts] = useState(null);
  const API_ENDPOINT = "http://23.22.32.42/api";
  const [formData, setFormData] = useState({
    section_id: id,
    date: "",
    shift_id: 2,
    need: 1,
    hour: 8,
    comment: "",
    staff_ids: [],
  });
  const token = useSelector((state) => state.userAuth.token);
  const postData = async () => {
  
    try {
      const response = await axios.get(`${API_ENDPOINT}/section-details`, formData, {
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary headers like authorization token, etc.
        },
      });
  
      console.log('Response:', response.data);
      // Handle the response as needed (e.g., set state, display success message, etc.)
    } catch (error) {
      console.error('Error:', error);
      // Handle errors (e.g., display error message, handle retries, etc.)
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data.users; // Assuming the user data is an array in response
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle errors if necessary
      }
    }
    const fetchShifts = async () => {
        try {
          const response = await axios.get(`${API_ENDPOINT}/shifts`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = response.data.shifts; 
          setShifts(userData);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    fetchUsers();
    fetchShifts()
  }, [token]); 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStaffIdsChange = (e) => {
    const selectedStaffIds = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setFormData({ ...formData, staff_ids: selectedStaffIds });
  };

  const handleShiftIdChange = (e) => {
    const selectedShiftId = parseInt(e.target.value);
    setFormData({ ...formData, shift_id: selectedShiftId });
  };

  const handleSubmit = () => {
    // Handle your form submission here
    // You can access form data using the 'formData' state.
    console.log("Form Data:", formData);
    postData()
    update()
    // Close modal after handling the form submission
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Enter Details</h2>
        <label>
          Date:
          <input
            type="date"
            className="input"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Hour:
          <input
            type="number"
            className="input"
            name="hour"
            value={formData.hour}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Need:
          <input
            type="number"
            className="input"
            name="need"
            value={formData.need}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Comment:
          <input
            type="text"
            className="input"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Staff IDs:
          <select
            multiple
            name="staff_ids"
            value={formData.staff_ids}
            onChange={handleStaffIdsChange}
          >
            {users?.map((user) => {
                return <option value={user.id}>{user.name}</option>
            })}
          
          
            {/* Add other staff options dynamically */}
          </select>
        </label>
        <label>
          Shift ID:
          <select
            name="shift_id"
            value={formData.shift_id}
            onChange={handleShiftIdChange}
          >
              {shifts?.map((shift) => {
                return <option value={shift.id}>{shift.name}</option>
            })}
          </select>
        </label>
        {/* Other input fields */}
        <button className="send" onClick={handleSubmit}>Submit</button>
        <button className="close" onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default YourModal;
