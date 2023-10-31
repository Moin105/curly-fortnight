import React, { useState, useEffect } from "react";
import "./modald.css";
import axios from "axios";
import { useSelector } from "react-redux";
import {AiFillCloseCircle} from 'react-icons/ai'
import { toast } from "react-toastify";
const YourModal = ({ closeModal, id, update }) => {
  const [users, setUsers] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [shifts, setShifts] = useState(null);
  const API_ENDPOINT = "http://23.22.32.42/api";
  
  const [formData, setFormData] = useState({
    section_id: id,
    date: "",
    shift_id: 1,
    need: 1,
    hour: 8 ,
    comment: "",
    staff_ids: [],
  });

  const handleUserSelection = (e) => {
    const selectedUserId = parseInt(e.target.value);
    const selectedUser = users?.find(user => user.id === selectedUserId);
    if (selectedUser) {
      // Add the selected user to the staff_ids array in the formData
      setFormData(prevData => ({
        ...prevData,
        staff_ids: [...prevData.staff_ids, selectedUserId],
      }));
      const hourMultiplier = formData.staff_ids.length > 0 ? formData.staff_ids.length : 1;
      setFormData({ ...formData, hour: 8 * hourMultiplier });
      // Add the selected user to the selectedUsers state for display
      setSelectedUsers(prevUsers => [
        ...prevUsers,
        { id: selectedUser.id, name: selectedUser.name }
      ]);
    }
  };
  const token = useSelector((state) => state.userAuth.token);
  const postData = async () => {
    console.log("toekkken",token)
    if(formData.date == "" ){
      toast.error("Please select Date")
      return;
    }else if( formData.shift_id == "" ){
      toast.error("Please select Shift")
      return;
    }
    else if( formData.need == "" ){
      toast.error("Please enter Need")
      return;
    }
    else if( formData.hour == "" ){
      toast.error("Please enter Hour")
      return;
    }
    else if( formData.staff_ids.length == [] ){
      toast.error("Please select Staff")
      return;
    }
    try {
      const response = await axios.post(
        `${API_ENDPOINT}/section-details`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            // Add any necessary headers like authorization token, etc.
          },
        }
      );

      console.log("Response:", response.data);
      // Handle the response as needed (e.g., set state, display success message, etc.)
    } catch (error) {
      console.error("Error:", error);
      // Handle errors (e.g., display error message, handle retries, etc.)
    }
  };
  useEffect(() => {
   
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
    };

    fetchShifts();
  }, [token]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/users/${formData.shift_id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data.user; // Assuming the user data is an array in response
        setUsers([userData]);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle errors if necessary
      }
    };
    fetchUsers();
    console.log("users",users)
  }, [formData.shift_id])
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is for the 'date' field
    if (name === 'date') {
      const selectedDate = new Date(value);
      const currentDate = new Date();

      // Compare the selected date with the current date
      if (selectedDate < currentDate) {
        // You can show an error message or handle the invalid date selection here
        // console.log('Please select a current or future date');
        toast.error("Please select a current or future date")
        // Optionally, you can reset the date field to the current date
        setFormData({ ...formData, [name]: currentDate.toISOString().split('T')[0] });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleDeleteUser = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u !== user));
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
    postData();
    update();
    // Close modal after handling the form submission
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-contents">
        <h2>Enter Details</h2>
        <div className="row">
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
          Shift ID:
          <select
            name="shift_id"
            value={formData.shift_id}
            onChange={handleShiftIdChange}
          >
            {shifts?.map((shift) => {
              return <option value={shift.id}>{shift.name}</option>;
            })}
          </select>
        </label>
            

        </div>
        <div className="row">
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
          Staff IDs:
          <select onChange={handleUserSelection}>
        <option value="">Select a user</option>
        {users && Array.isArray(users) ? (
  users.map(user => (
    <option key={user?.id} value={user?.id}>
      {user?.name}
    </option>
  ))
) : (
  <option value="">No users found</option>
)}
      </select>
      <div className="selected-users">
        {selectedUsers.map((user) => (
          <div key={user.id} className="selected-user">
            {user?.name}
            <span onClick={() => handleDeleteUser(user)}>
              <AiFillCloseCircle />
            </span>
          </div>
        ))}
      </div>
          {/* <select
            multiple
            name="staff_ids"
            value={formData.staff_ids}
            onChange={handleStaffIdsChange}
          >
            {users?.map((user) => {
              return <option value={user.id}>{user.name}</option>;
            })}
          </select> */}
        </label>
        </div>
        <div className="row">
  
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
        </div>
        {/* Other input fields */}
        <button className="send" onClick={handleSubmit}>
          Submit
        </button>
        <button className="close" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default YourModal;
