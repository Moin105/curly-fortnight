import React, { useState, useEffect } from "react";
import "./modald.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
const EditModalDetail = ({ closeModal, id, update,shiftdata,updateId }) => {
  const [users, setUsers] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [shifts, setShifts] = useState(null);
  const [currentShift, setCurrentShift] = useState(1);
  const [shiftdataw, setShiftData] = useState(null);
  const API_ENDPOINT = "https://api.upscalemsgroup.com/api";
 useEffect(() => {
   console.log("shiftData",shiftdata)
   setSelectedUsers(shiftdata?.users)
   setFormData((prevData) => ({
    ...prevData,
    // date: shiftdata?.date,
    shift_id: id,
    need: shiftdata?.need ||1,
    // hour: shiftdata?.hour,
    // comment: shiftdata?.comment,
    staff_ids: shiftdata?.users?.map((user) => user.id) || [],

   }))
   setCurrentShift(id)
 }, [])
 
  const [formData, setFormData] = useState({
    // section_id: id,
    // date: "",
    _method:"put",
    shift_id: 1,
    need: 1,
    hour: 8,
    staff_ids: [],
  });

  const handleUserSelection = (e) => {
    const selectedUserId = parseInt(e.target.value);
    const selectedUser = users?.find((user) => user.id === selectedUserId);

    if (selectedUser) {
        setFormData((prevData) => {
            const updatedStaffIds = Array.isArray(prevData.staff_ids)
              ? [...prevData.staff_ids, selectedUserId]
              : [selectedUserId]; // If prevData.staff_ids is not an array, initialize a new array with the selectedUserId
          
            const hourMultiplier = updatedStaffIds.length > 0 ? updatedStaffIds.length : 1;
          
            return {
              ...prevData,
              staff_ids: updatedStaffIds,
              hour: 8 * hourMultiplier,
            };
          });
          

      setSelectedUsers((prevUsers) => {
        const newUser = { id: selectedUser.id, name: selectedUser.name };
        if (Array.isArray(prevUsers)) {
          return [...prevUsers, newUser];
        } else {
          return [newUser]; // If prevUsers is not an array (empty or undefined), return a new array with the new user
        }
      });
    }
  };

  const token = useSelector((state) => state.userAuth.token);
//   const postData = async () => {
//     console.log("toekkken", token);
//     if (formData.date == "") {
//       toast.error("Please select Date");
//       return;
//     } else if (formData.shift_id == "") {
//       toast.error("Please select Shift");
//       return;
//     } else if (formData.need == "") {
//       toast.error("Please enter Need");
//       return;
//     } else if (formData.hour == "") {
//       toast.error("Please enter Hour");
//       return;
//     } else if (formData.staff_ids == []) {
//       toast.error("Please select Staff");
//       return;
//     } else if (
//       formData.need > formData.staff_ids.length ||
//       formData.need < formData.staff_ids.length
//     ) {
//       console.log("FormFormData:", formData, selectedUsers.length);
//       toast.error("Select Staff As Per Need ");
//       return;
//     }
//     console.log("FormFormData:", formData, selectedUsers.length);
//     try {
//       const response = await axios.post(
//         `${API_ENDPOINT}/section-details`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Response:", response.data);
//       toast.success(response.data.message);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
const postApiData = async () => {
    try {
      const response = await axios.post( `${API_ENDPOINT}/section-details/${updateId}`, formData, {
        headers: {
          'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          // Add other headers if needed, such as authorization
        }
      });
      console.log('POST request successful!', response.data);
      // Handle the response as needed
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error making POST request:', error);
      // Handle errors from the request
    }
  };
  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/shifts/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data.shift;
        console.log("shifter", userData)
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
        const response = await axios.get(
          `${API_ENDPOINT}/users/by-shift/${currentShift}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = response.data.users;
        console.log("shift based user", userData);
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
    console.log("currentshift", users);
  }, [currentShift]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "date") {
      const selectedDate = new Date(value);
      const currentDate = new Date();

      if (selectedDate < currentDate) {
       toast.error("Please select a current or future date");
        setFormData({
          ...formData,
          [name]: currentDate.toISOString().split("T")[0],
        });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleDeleteUser = (user) => {
    const updatedSelectedUsers = selectedUsers.filter((u) => u !== user);
    setSelectedUsers(updatedSelectedUsers);

    const updatedStaffIds = formData.staff_ids.filter((id) => id !== user.id);
    
    setFormData((prevData) => ({
      ...prevData,
      staff_ids: updatedStaffIds,
    }));
    const hourMultiplier =
    updatedStaffIds.length > 0 ? updatedStaffIds.length : 1;
   setFormData((prevData) => ({
    ...prevData,
    hour: 8 * hourMultiplier, 
   }))
   setSelectedUsers([])
  };


//   const handleShiftIdChange = (e) => {
//     // const selectedShiftId = parseInt(e.target.value);

//     setFormData({ ...formData, shift_id: id });
//     selectedShiftId && setCurrentShift(id);
//   };

  const handleSubmit = () => {
  
    console.log("Form Data:", formData,updateId);
    postApiData()
    // postData();
    // setFormData({
    //   section_id: id,
    //   date: "",
    //   shift_id: 1,
    //   need: 1,
    //   hour: 8,
    //   comment: "",
    //   staff_ids: [],
    // });
    update();
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
            <input
              name="shift_id"
              value={shifts?.name}
              disabled={true}
            //   onChange={handleShiftIdChange}
            />
              {/* {shifts?.map((shift) => {
                return (
                  <option value={shift.id} onClick={() => {}}>
                    {shift.name}
                  </option>
                );
              })} */}
            {/* </select> */}
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
        <div className="row">
          <label>
            Staff IDs:
            <select onChange={handleUserSelection}>
              <option value="">Select a user</option>
              {users && Array.isArray(users) ? (
                users.map((user) => (
                  <option key={user?.id} value={user?.id}>
                    {user.name}
                  </option>
                ))
              ) : (
                <option value="">No users found</option>
              )}
            </select>
            <div className="selected-users">
              {selectedUsers?.map((user) => (
                <div key={user.id} className="selected-user">
                  {user?.name}
                  <span onClick={() => handleDeleteUser(user)}>
                    <AiFillCloseCircle />
                  </span>
                </div>
              ))}
            </div>
          </label>
        </div>
        {/* Other input fields */}
        <div className="row">
          <button className="send" onClick={handleSubmit}>
            Submit
          </button>
          <button
            className="close"
            onClick={() => {
              setFormData({
                section_id: id,
                date: "",
                shift_id: 1,
                need: 1,
                hour: 8,
                comment: "",
                staff_ids: [],
              });
              closeModal();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModalDetail;
