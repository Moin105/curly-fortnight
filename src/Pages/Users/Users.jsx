import React, { useEffect, useState } from "react";
import "./styles.css";
import Layout from "../../Layout/Layout";
import axios from "axios";
import Modal from "./UserModal";
import SectionSelect from "./SectionSelect";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
function Users() {
  const [users, setUsers] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [UserInformation, setUserInformation] = useState(null);
  const [sections, setSections] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalOpens, setIsModalOpens] = useState(false);
  const [isModalO, setIsModalO] = useState(false);
  const token = useSelector((state) => state.userAuth.token);
  const API_ENDPOINT = "https://api.upscalemsgroup.com/api";
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
  const getUsers = async () => {
    const response = await axios.get(`${API_ENDPOINT}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    console.log(data);
    setUsers(data.users);
  };
  useEffect(() => {
    getUsers(); 
  }, [])
  
  const changeRole = async (id) => {
    const response = await axios.put(
      `${API_ENDPOINT}/users/${id}/make-or-remove-admin`,
      { section_ids: selectedOption.map((section) => String(section.id)) },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    console.log("user information", data);
    if (data.status == 200) {
      getUsers();
      toast.success(data.message);
      closeModal();
    } else {
      toast.error("Something went wrong");
    }
  };
  const removeAdmin = async (id) => {
    const response = await axios.put(
      `${API_ENDPOINT}/users/${id}/make-or-remove-admin`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    console.log("user information", data);
    if (data.status == 200) {
      getUsers();
      toast.success(data.message);
      closeModals();
    } else {
      toast.error("Something went wrong");
    }
  };
  const deleteUser = async (userId) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}/users/delete/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check the response and handle the success
      if (response.status === 200) {
        getUsers();
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
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeModals = () => {
    setIsModalOpens(false);
  };
  const handleSelect = (value) => {
    setSelectedOption(value);
    console.log(`Option selected:`, value);
  };
  const getSections = async () => {
    const response = await axios.get(`${API_ENDPOINT}/sections`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    console.log(data);
    setSections(data.sections);
  };

  const getUserById = async (id) => {
    const response = await axios.get(`${API_ENDPOINT}/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    console.log("user information", data);
    setUserInformation(data.user);
  };
  useEffect(() => {
    
      getSections();
      getUsers();
    
  }, []);
  const emailToRemove = "superadmin@admin.com";

  // Assuming 'users' is the array that contains objects with 'email' field
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
          <h2>Employees</h2>
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
                      Employee{" "}
                    </th>
                    <th>Role </th>
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
                        <td>{user?.roles[0]?.display_name == 'User' ? 'Employee' : user?.roles[0]?.display_name}</td>
                        <td className="long"></td>
                        <td>
                          <p
                            onClick={() => {
                              if (user?.roles[0]?.display_name == "Admin") {
                                openModals();
                                getUserById(user.id);
                              } else {
                                openModal("User ");
                                getUserById(user.id);
                              }
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
                No Employee Found
              </h2>
            </div>
          )}
        </div>
      </Layout>
      <Modal isOpen={isModalOpen}>
        <h2>Edit Employee Role</h2>
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
      </Modal>
      <Modal isOpen={isModalO}>
        <h2>Delete Employee?</h2>
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

export default Users;
