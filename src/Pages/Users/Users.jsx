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
  const token = useSelector((state) => state.userAuth.token);
  const API_ENDPOINT = "http://23.22.32.42/api";
  const openModal = () => {
    setIsModalOpen(true);
  };
  const openModals = () => {
    setIsModalOpens(true);
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
    if(data.status == 200){
      getUsers();
      toast.success(data.message)
      closeModal();
    }else{
      toast.error("Something went wrong")
    }
  };
  const removeAdmin = async (id) => {
    const response = await axios.put(
      `${API_ENDPOINT}/users/${id}/make-or-remove-admin`,
      { section_ids: [] },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    console.log("user information", data);
    if(data.status == 200){
      getUsers();
      toast.success(data.message)
      closeModal();
    }else{
      toast.error("Something went wrong")
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
    return () => {
      getSections();
      getUsers();
    };
  }, []);
  const emailToRemove = "superadmin@admin.com";

  // Assuming 'users' is the array that contains objects with 'email' field
  const filteredUsers = users?.filter((user) => user.email !== emailToRemove);
  return (
    <div>
      <ToastContainer />
      {" "}
      <Layout>
        <div className="activitylog-container">
          <h2>Users</h2>
          {users && users.length > 0 ? (
            <div className="activity-wrapper">
              <table class="blueTable">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>User </th>
                    <th>Role </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td className="blue">{user.name}</td>
                        <td>{user?.roles[0]?.display_name}</td>
                        <td className="long"></td>
                        <td
                          onClick={() => {
                           if(user?.roles[0]?.display_name == "Admin"){
                             openModals()
                             getUserById(user.id);
                           }else{
                             openModal("User ");
                             getUserById(user.id);
                           } 
                          }}
                        >
                          edit
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
                No Users Found
              </h2>
            </div>
          )}
        </div>
      </Layout>
      <Modal isOpen={isModalOpen} >
        
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
      <Modal isOpen={isModalOpens} >
        
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
    </div>
  );
}

export default Users;