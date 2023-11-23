import React, { useEffect, useState } from "react";
import "./styles.css";
import Layout from "../../Layout/Layout";
import axios from "axios";
import Modal from "./UserModal";
import SectionSelect from "./SectionSelect";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom/dist";
import { useSelector } from "react-redux";
function ActivityLog() {
  const [users, setUsers] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [UserInformation, setUserInformation] = useState(null);
  const [sections, setSections] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const token = useSelector((state) => state.userAuth.token);
  const API_ENDPOINT = "https://api.upscalemsgroup.com/api";
  const openModal = () => {
    setIsModalOpen(true);
  }; const getUsers = async () => {
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
  const closeModal = () => {
    setIsModalOpen(false);
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
   
 return     getSections();

  }, []);
  const emailToRemove = "superadmin@admin.com";
  const [searchQuery, setSearchQuery] = useState("");
  // Assuming 'users' is the array that contains objects with 'email' field
  const filteredUsers = users?.filter((user) => user.email !== emailToRemove);
  console.log("searchData", searchQuery)
  const [filteredUserses, setFilteredUserses] = useState(null);
  useEffect(() => {
    const filtered = users?.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUserses(filtered);
  }, [searchQuery, users]);
  useEffect(() => {
   return getUsers();
  }, [])
  
  return (
    <div>
      <ToastContainer />
      {" "}
      <Layout setSearchQuery={setSearchQuery}>
        <div className="activitylog-container">
          <h2>Activity Log</h2>
          {users && users.length > 0 ? (
            <div className="activity-wrapper">
              <table class="blueTable">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>Employee </th>
                    <th>Role </th>
                    <th className="long">Activity</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUserses?.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <input type="checkbox" />
                        </td>
                        <td className="blue">{user.name}</td>
                        <td>{user?.roles[0]?.display_name == 'User' ? 'Employee' : user?.roles[0]?.display_name}</td>
                        <td className="underline"><Link to={`/activitylog/${user.id}`}><p>wefwefewfwefwef</p></Link></td>
                        <td className="long"></td>
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
      <Modal isOpen={isModalOpen}>
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
    </div>
  );
}

export default ActivityLog;
