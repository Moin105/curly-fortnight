import React, { useEffect, useState } from "react";
import "./styles.css";
import Layout from "../../Layout/Layout";
import axios from "axios";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
// import Modal from "./UserModal";
// import SectionSelect from "./SectionSelect";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
function Shifts() {
  const [users, setUsers] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [UserInformation, setUserInformation] = useState(null);
  const [sections, setSections] = useState([]);
  const navigate = useNavigate();   
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalOpens, setIsModalOpens] = useState(false);
  const [isModalO, setIsModalO] = useState(false);
  const token = useSelector((state) => state.userAuth.token);
  const API_ENDPOINT = "http://23.22.32.42/api";
  const openModal = () => {
    setIsModalOpen(true);
  };
  const openModals = () => {
    setIsModalOpens(true);
  };
  const openMo = () => {
    setIsModalO(true);
  };
  const closeMo = () => {
    setIsModalO(false);
  };
  const getShifts = async () => {
    const response = await axios.get(`${API_ENDPOINT}/shifts`, {
      params:{
        type:"home"
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    console.log("shifts information", data);
    setUsers(data.shifts);
  };
//   const changeRole = async (id) => {
//     const response = await axios.put(
//       `${API_ENDPOINT}/users/${id}/make-or-remove-admin`,
//       { section_ids: selectedOption.map((section) => String(section.id)) },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     const data = response.data;
//     console.log("user information", data);
//     if (data.status == 200) {
//       getUsers();
//       toast.success(data.message);
//       closeModal();
//     } else {
//       toast.error("Something went wrong");
//     }
//   };
//   const removeAdmin = async (id) => {
//     const response = await axios.put(
//       `${API_ENDPOINT}/users/${id}/make-or-remove-admin`,
//       {},
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     const data = response.data;
//     console.log("user information", data);
//     if (data.status == 200) {
//       getUsers();
//       toast.success(data.message);
//       closeModals();
//     } else {
//       toast.error("Something went wrong");
//     }
//   };
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `${API_ENDPOINT}/shifts/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  console.log("delte", response)
      // Check the response and handle the success
      if (response.status === 200) {
        getShifts();
        toast.success(response.data.message);
        closeMo();
        // console.log(data);
        
        // Perform any additional actions upon successful deletion
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle errors here
    }
  };
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };
//   const closeModals = () => {
//     setIsModalOpens(false);
//   };
//   const handleSelect = (value) => {
//     setSelectedOption(value);
//     console.log(`Option selected:`, value);
//   };
//   const getSections = async () => {
//     const response = await axios.get(`${API_ENDPOINT}/sections`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = response.data;
//     console.log(data);
//     setSections(data.sections);
//   };

  const getUserById = async (id) => {
    const response = await axios.get(`${API_ENDPOINT}/shifts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    console.log("user shift information", data);
    setUserInformation(data.shift);
  };
  useEffect(() => {
    return () => {
    //   getSections();
      getShifts();
    };
  }, []);
  const emailToRemove = "superadmin@admin.com";
  const filteredUsers = users?.filter((user) => user.email !== emailToRemove);
  const [searchQuery, setSearchQuery] = useState("");
  console.log("searchData", searchQuery);
  const [filteredUserses, setFilteredUserses] = useState(null);
  useEffect(() => {
    const filtered = users?.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUserses(filtered);
  }, [searchQuery, users]);
  return (
    <div>
      <ToastContainer />{" "}
      <Layout setSearchQuery={setSearchQuery}>
        <div className="activitylog-container">
          <h2>Shifts</h2>
          {users && users.length > 0 ? (
            <div className="activity-wrapper">
              <table class="blueTable">
                <thead>
                  <tr>
                    {/* <th>
                      <input type="checkbox" />
                    </th> */}
                    <th style={{ padding: "10px 20px", textAlign: "left" }}>
                      {" "}
                      Shifts{" "}
                    </th>
                    <th>To  </th>
                    <th>From</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUserses?.map((user, index) => {
                    return (
                      <tr key={index}>
                        {/* <td>
                          <input type="checkbox" />
                        </td> */}
                        <td
                          className="blue"
                          style={{ padding: "10px 20px", textAlign: "left" }}
                        >
                          {user.name}
                        </td>
                        <td>{user?.to}</td>
                        <td>{user?.from}</td>
                        <td style={{color: user.status == 1 ? "#31BC01" : "#BC0101"}}>{user.status == 1 ? 'Active': 'Disable'}</td>
                        <td className="long"></td>
                        <td>
                          <p
                            onClick={() => {
                          navigate(`/shifts/edit-shift/${user?.id}`)
                            }}
                          >
                            edit
                          </p>
                          <p
                             onClick={() => {
                              openMo();
                              getUserById(user.id);
                            }}
                          >delete</p>
                        </td>
                      </tr>
                    );
                  })}{" "}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <h2
                style={{
                  width: "100%",
                  textAlign: "center",
                  height: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                No Shifts Found
              </h2>
            </div>
          )}
        </div>
      </Layout>
      {/* <Modal isOpen={isModalOpen}>
        <h2>Edit User Role</h2>
        <div>
          <h3>
            User Role{" "}
            <span style={{ color: "#0078C3" }}>
              {UserInformation?.roles[0]?.name}
            </span>
          </h3>
        </div>
        <SectionSelect options={sections} onSelect={handleSelect} />

        <div className="row">
          <button className="close" onClick={closeModal}>
            Close
          </button>
          <button
            className="send"
            onClick={() => {
              changeRole(UserInformation?.id);
            }}
          >
            Change
          </button>
        </div>
      </Modal>
      <Modal isOpen={isModalOpens}>
        <h2>Remove Admin Access?</h2>
        <div className="row">
          <button className="close" onClick={closeModals}>
            No
          </button>
          <button
            className="send"
            onClick={() => {
              removeAdmin(UserInformation?.id);
            }}
          >
            Yes
          </button>
        </div>
      </Modal> */}
      <Modal isOpen={isModalO}>
        <h2>Delete User?</h2>
        <div className="row">
          <button className="close" onClick={closeMo}>
            No
          </button>
          <button
            className="send"
            onClick={() => {
              deleteUser(UserInformation?.id);
            }}
          >
            Yes
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Shifts;
