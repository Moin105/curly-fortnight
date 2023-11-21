import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../../Layout/Layout";
import { AiFillCloseCircle } from "react-icons/ai";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

function Resources() {

  const [resourcesCategories, setResourcesCategories] = useState([]);
  const API_ENDPOINT = "https://api.upscalemsgroup.com/api";
  const [show, setShow] = useState(false);
  const [currentResourceCategory, setCurrentResourceCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpens, setIsModalOpens] = useState(false);
  const token = useSelector((state) => state.userAuth.token);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [shifts, setShifts] = useState([]);
  const role = useSelector((state) => state.userAuth?.user?.roles[0]?.name); // Assuming the role is obtained from state

  const [userResourceData, setUserResourceData] = useState({
    category_id: "",
    resource_type: '',
    resource_id: "",
    name: "",
    shift_id: "",
    is_available: 1,
  });
  const [resources, setResources] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const handleStaffIdsChange = (e) => {
    const selectedUserId = parseInt(e.target.value);

    // Find the selected user based on the ID from the userOptions array
    const selectedUser = users?.find((user) => user.id === selectedUserId);

    // Assuming selectedUser contains necessary properties for resource_id and name
    setUserResourceData({
      ...userResourceData,
      resource_id: selectedUser.id,
      // name: selectedUser.name,
    });
  };
  const handleResourceTypeChange = (e) => {
    const selectedResourceType = e.target.value;
    setUserResourceData({ ...userResourceData, resource_type: selectedResourceType });
  }

  const handleShiftIdChange = (e) => {
    const selectedShiftId = parseInt(e.target.value);
    setUserResourceData({ ...userResourceData, shift_id: selectedShiftId });
  };
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const openModals = () => {
    setIsModalOpens(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeModals = () => {
    setIsModalOpens(false);
  };
  const handleSelect = (value) => {
    console.log(`Option selected:`, value);
  };
  const getResourcesCategory = async () => {
    const response = await axios.get(`${API_ENDPOINT}/resource-categories`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    console.log("resources", data);
    setResourcesCategories(data.resource_categories);
  };
  const getResources = async () => {
    const response = await axios.get(`${API_ENDPOINT}/resources`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    console.log("resources", data);
    setResources(data.resources);
  };
  const  postResources = async () => {
    if(userResourceData.name == ""){
      toast.error("Please enter resource name");
      return
    }
    else if(userResourceData.shift_id == ''){
      toast.error("Please select shift");
      return
    }
    else if (userResourceData.resource_id == ""){
      toast.error("Please select user");
      return
    }
    const response = await axios.post(`${API_ENDPOINT}/resources`, userResourceData,{
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    console.log("posted rr",data)
    if(data.status == 201){
      toast.success(data.message)
    }else{
      toast.error("Resource Not Created")
    }
    getResources();
    closeModals()
  };
  useEffect(() => {
    return () => {
      getResourcesCategory();
      getResources();
    };
  }, []);

  const createResourceCategory = async () => {
    if (name == "") {
      toast.error("Please enter resource name");
      return;
    }
    const response = await axios.post(
      `${API_ENDPOINT}/resource-categories`,
      { display_name: name },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    console.log("data", data);
    getResourcesCategory();
    toast.success(data.message);
    setName("");
    closeModal();
  };
  const getResourcesCategoryById = async (id) => {
    const response = await axios.get(
      `${API_ENDPOINT}/resource-categories/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    console.log("resources", data);
    setResourcesCategories(data.resource_categories);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/users`, {params:{
          type:"not-resource"
         },
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
    };
    const fetchShifts = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/shifts`,
         {
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
    fetchUsers();
    fetchShifts();
  }, [token]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResources, setFilteredResources] = useState([]);
  useEffect(() => {
    const filtered = resources.filter((resource) =>
      resource.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredResources(filtered);
  }, [searchQuery, resources]);
 
  return (
    <div>
      <Layout setSearchQuery={setSearchQuery}>
        <div className="resources-container">
          <div className="rows">
            <h2>Resources</h2>
            <div className="categories">
              {" "}
              <span
                onClick={() => {
                  openModal();
                }}
              >
                Add New
              </span>
              {resourcesCategories.map((category) => {
                return (
                  <span
                    onClick={() => {
                      setCurrentResourceCategory(category);
                      setUserResourceData({
                        ...userResourceData,
                        category_id: category.id,
                      });
                    }}
                  >
                    {category.name}
                  </span>
                );
              })}
            </div>
          </div>
          {currentResourceCategory && (
            <div className="rowss">
              <h2>{currentResourceCategory.name}</h2>
              <div className="categories">
                <div className="rin">
                  <button
                    onClick={() => {
                      openModals();
                    }}
                  >
                    Add Resource
                  </button>
                  <button
                    className="close"
                    onClick={() => {
                      setCurrentResourceCategory(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
                {/* <AiFillCloseCircle
                  onClick={() => {
                    setCurrentResourceCategory(null);
                  }}
                /> */}
              </div>
            </div>
          )}
          <div className="resources-wrapper">
            <table class="blueTable">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Name </th>
                  <th>Availability </th>
                  <th>Assigned Section</th>
                  <th>Assigned By</th>
                  <th className="long"></th>
                </tr>
              </thead>
              <tbody>
                {filteredResources.map((resource, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <input type="checkbox" />
                      </td>
                      <td className="blue">{resource?.name}</td>
                      <td className="green">{resource?.status == 1 ?<p style={{color:"#31bc01"}}>Available</p> : <p style={{color:"#BC0101"}}> N/A</p>}</td>
                      <td>{resource?.assigned_section?.name  ? resource?.assigned_section?.name :<p>No Section Assigned</p>}</td>
                      <td>{resource?.assigned_by?.name  ? resource?.assigned_by?.name : "No One Assigned"}</td>
                      <td className="long"></td>
                    </tr>
                  );
                })}
                {/* <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td className="blue"> wefwefwef</td>
                  <td className="green">Shift 1 (08:00 AM -01:00 PM)</td>
                  <td>ewfewfwefewfwefewf</td>
                  <td>wfwefwefefwe</td>
                  <td className="long"></td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
      <Modal isOpen={isModalOpen}>
        <h2>Add Resource Name</h2>
        <div></div>
        <input
          type="text"
          className="input"
          placeholder="Add Resource Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <div className="row">
          <button className="close" onClick={closeModal}>
            Close
          </button>
          <button
            className="send"
            onClick={() => {
              createResourceCategory();
            }}
          >
            Add
          </button>
        </div>
      </Modal>
      <Modal isOpen={isModalOpens}>
        <h2>Create Resource</h2>
        <div className="rowsins">
          <div className="row-sin" >
            <p>Name</p>
            <input
              type="text"
              className="input"
              placeholder="Add Resource Name"
              onChange={(e) => {
                setUserResourceData({...userResourceData,name:e.target.value});
              }}
            />
          </div>
          <div className="row-sin" >
            <p>Resource Type</p>
            <select
              id="dropdown"
              name="shift_id"
              value={userResourceData.resource_type}
              onChange={handleResourceTypeChange}
            >
              <option value="">Select Resource Type</option>
              <option value="App\Models\User">Employee</option>
              <option value="App\Models\Equipment">Equipment</option>
              
            </select>
          </div>
        </div>
        <div className="rowsins">
          <div className="row-sin">
            <label htmlFor="dropdown">Employees:</label>
            <select
              id="dropdown"
              name="resource_id"
              value={userResourceData.resource_id}
              onChange={handleStaffIdsChange}
            >
              <option value="">Select Employee</option>
              {users?.map((user) => {
                return <option value={user.id}>{user.name}</option>;
              })}
            </select>
          </div>
          <div className="row-sin">
            <label htmlFor="dropdown">Shifts:</label>
            <select
              id="dropdown"
              name="shift_id"
              value={userResourceData.shift_id}
              onChange={handleShiftIdChange}
            >
              <option value="">Select Shift</option>
              {shifts?.map((shift) => {
                return <option value={shift.id}>{shift.name}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="row">
          <button className="close" onClick={closeModals}>
            Close
          </button>
          <button
            className="send"
            onClick={() => {
              console.log("current category", currentResourceCategory);
              // createResourceCategory();
              postResources()
            }}
          >
            Add
          </button>
        </div>
      </Modal>
      <ToastContainer/>
    </div>
  );
}

export default Resources;
