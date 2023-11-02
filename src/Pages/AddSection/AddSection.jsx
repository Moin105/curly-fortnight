import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SectionHeader from "../../Components/Header/SectionHeader";
import "./styles.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FcComments } from "react-icons/fc";
import YourModal from "./DetailModal";
import EditModalDetail from "./EditModalDetail";
import CommentModal from "./CommentModal";
function AddSection() {
  const [sectionDates, setSectionDates] = useState([]);
  const [comment,setComment]= useState("")
  const [userInput, setUserInput] = useState("");
  const [shows,setShows]=useState(false)
  const [updateShift, setUpdateShift] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [display,setDisplay]=useState(false)
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.userAuth.token);
  const { id } = useParams();
  const [sectionName, setSectionName] = useState("");
  const [shiftData, setShiftData] = useState(null);
  const getSectionById = async () => {
    const response = await axios.get(`${API_ENDPOINT}/sections/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    console.log("section id", data);
    setSectionDates(data.section_dates);
    setTableData(data?.section_dates);
    console.log("tabledata", tableData);
  };
  useEffect(() => {
    if (id) {
      console.log(id);
      getSectionById();
    }
  }, []);

  useEffect(() => {
    // Fetch users data when the component mounts
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
    };

    fetchUsers(); // Invoke the function
  }, [token]);

  const navigate = useNavigate();
  const API_ENDPOINT = "http://23.22.32.42/api";
  const createSection = async () => {
    if (sectionName === "") {
      return toast.error("Please enter a section name");
    } else {
      if (id) {
        console.log("update section", sectionName);
        const response = await axios.post(
          `${API_ENDPOINT}/sections/${id}`,
          { name: sectionName, _method: "PUT" },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log(data);
        if (data.status == 200) {
          toast.success("Section Created Successfully");
          navigate("/sections");
        } else {
          toast.error("Error Updating Section");
        }
      } else {
        const response = await axios.post(
          `${API_ENDPOINT}/sections`,
          { name: sectionName },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log(data);
        if (data.status > 200) {
          toast.success("Section Created Successfully");
          navigate("/sections");
        } else {
          toast.error("Error Creating Section");
        }
      }
    }
  };

  const [selectedDate, setSelectedDate] = useState(sectionDates[0]?.date); // Defaulting to the first date
  const [show, setShow] = useState(false);
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const selectedDateObject = sectionDates?.find(
    (item) => item.date === selectedDate
  );
  useEffect(() => {
    // Filter the data based on the selected date

    if (selectedDateObject) {
      // Set the tableData state to the section_details of the selected date's object
      console.log("true", true);
      setTableData(selectedDateObject?.section_details);
      console.log("tableData", tableData);
    }
  }, [selectedDate, sectionDates]);
  const availableDates = sectionDates?.map((item) => item.date);
  const [editableRow, setEditableRow] = useState(null);
  const [update_id, setUpdateId] = useState(null);
  const [currentShift, setCurrentShift] = useState(null);
  const handleEdit = (shift) => {
    // setCurrentShift(shift);
    console.log("shiftdata", shift.id,shift);
    setUpdateShift(shift)
    
    setShows(true);
  };

  const handleSave = () => {
    setEditableRow(null); // Disables editing mode after save
  };

  const handleInputChange = (value, field, index) => {
    setTableData((prevState) => {
      const newData = prevState.map((row, i) => {
        if (i === index) {
          return { ...row, [field]: value };
        }
        return row;
      });
      return newData;
    });
  };
  const handleNeedChange = (value, index) => {
    setTableData((prevState) => {
      const newData = prevState.map((row, i) => {
        if (i === index) {
          const updatedRow = { ...row, need: parseInt(value, 10) }; // Update 'need' in the row
          // For instance, limit the staff selection to the first 'n' users according to 'need'
          const limitedStaff = users.slice(0, updatedRow.need);

          updatedRow.staff_ids = limitedStaff.map((user) => user.id);
          return updatedRow;
        }
        return row;
      });
      return newData;
    });
  };
  return (
    <div className="add-section-container">
      <SectionHeader id={id} />
      <ToastContainer />
      {id ? (
        <div className="rowss">
          <h2>Filter</h2>
          <div className="categories">
            <div className="rin">
              <button
                onClick={() => {
                  setShow(!show);
                  setCurrentShift("");
                  setShiftData(null);
                }}
              >
                Assign Duties
              </button>
            </div>
            {/* <AiFillCloseCircle
                  onClick={() => {
                    setCurrentResourceCategory(null);
                  }}
                /> */}
          </div>
        </div>
      ) : (
        <div className="input-container">
          <input
            type="text"
            onChange={(e) => {
              setSectionName(e.target.value);
            }}
            placeholder="Enter the name of Section"
            className="section-name-input"
          />
          <button
            className="add-section-btn"
            onClick={() => {
              createSection();
            }}
          >
            Save
          </button>
        </div>
      )}
      <table className="blueTable">
        <thead>
          <tr>
            <th>Date</th>
            <th>Shift</th>
            <th>Needs</th>
            <th className="long">Name of Staff</th>
            <th>Hrs</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((data, index) => (
            <tr key={index}>
              <td>{data?.date}</td>
              <td>
                <p>
                  {data.section_details[0]?.shift?.name
                    ? data.section_details[0]?.shift?.name
                    : "Morning"}
                </p>
                <p>
                  {data.section_details[1]?.shift?.name
                    ? data.section_details[1]?.shift?.name
                    : "Evening"}
                </p>
                <p>
                  {data.section_details[2]?.shift?.name
                    ? data.section_details[2]?.shift?.name
                    : "Night"}
                </p>
              </td>
              <td>
                <p>
                  {data.section_details[0]?.need
                    ? data.section_details[0]?.need
                    : "0"}
                </p>
                <p>
                  {data.section_details[1]?.need
                    ? data.section_details[1]?.need
                    : "0"}
                </p>
                <p>
                  {data.section_details[2]?.need
                    ? data.section_details[2]?.need
                    : "0"}
                </p>
              </td>
              <td>
                <p>
                  {data?.section_details[0]?.users.length > 0 ? (
                    <ul>
                      {data?.section_details[0]?.users.map(
                        (user, userIndex) => {
                          return <li key={userIndex}>{user.name}</li>;
                        }
                      )}
                    </ul>
                  ) : (
                    "No user assigned"
                  )}
                </p>
                <p>
                  {data?.section_details[1]?.users.length > 0 ? (
                    <ul>
                      {data?.section_details[0]?.users.map(
                        (user, userIndex) => {
                          return <li key={userIndex}>{user.name}</li>;
                        }
                      )}
                    </ul>
                  ) : (
                    "No user assigned"
                  )}
                </p>
                <p>
                  {data?.section_details[2]?.users.length > 0 ? (
                    <ul>
                      {data?.section_details[0]?.users.map(
                        (user, userIndex) => {
                          return <li key={userIndex}>{user.name}</li>;
                        }
                      )}
                    </ul>
                  ) : (
                    "No user assigned"
                  )}
                </p>
              </td>
              <td>
                <p>
                  {data.section_details[0]?.hour
                    ? data.section_details[0]?.hour
                    : 0}
                </p>
                <p>
                  {data.section_details[1]?.hour
                    ? data.section_details[1]?.hour
                    : 0}
                </p>
                <p>
                  {data.section_details[2]?.hour
                    ? data.section_details[2]?.hour
                    : 0}
                </p>
              </td>
              <td>
                <p style={{padding:"12px"}} onClick={()=>{
                  console.log("comment show",data.section_details[1])
                  setDisplay(true)
                  setComment(data.section_details[1]?.comment)
                  console.log("comment show",data.section_details[1]?.comment)
                  setUpdateShift(1)
                  setUpdateId(data.id)
                }}>
                  <FcComments />
                  {/* {data.section_details[0]?.comment
                    ? data.section_details[0]?.comment
                    : "No Comment Added Yet"} */}
                </p>
                <p style={{padding:"12px"}} onClick={()=>{
                  // setDisplay(true)
                  setComment(data.section_details[2]?.comment)
                  console.log("comment show",data.section_details[2]?.comment)
                   setUpdateShift(2)
                  setUpdateId(data.id)
                }}>
                  {" "}
                  <FcComments />
                  {/* {data.section_details[1]?.comment
                    ? data.section_details[1]?.comment
                    : "No Comment Added Yet"} */}
                </p>
                <p style={{padding:"12px"}} onClick={()=>{
                  setDisplay(true)
                  setComment(data.section_details[3]?.comment)
                  console.log("comment show",data.section_details[3]?.comment)
                  setUpdateShift(3)
                  setUpdateId(data.id)
                }}>
                  {" "}
                  <FcComments />
                  {/* {data.section_details[2]?.comment
                    ? data.section_details[2]?.comment
                    : "No Comment Added Yet"} */}
                </p>
              </td>
              <td>
                <span>
                  {" "}
                  <button
                    className="edit"
                    onClick={() => {
                      handleEdit(data);
                      setShiftData(data.section_details[0]);
                      setUpdateShift(1)
                      setUpdateId(data.id)
                    }}
                  >
                    Edit
                  </button>
                </span>
                <span>
                  <button
                    className="edit"
                    onClick={() => {
                      handleEdit(data);
                      setShiftData(data.section_details[1]);
                      setUpdateShift(2)
                      setUpdateId(data.id)
                    }}
                  >
                    Edit
                  </button>
                </span>
                <span>
                  <button
                    className="edit"
                    onClick={() => {
                      handleEdit(data);
                      setUpdateId(data.id)
                      setShiftData(data.section_details[2]);
                      setUpdateShift(3)
                    }}
                  >
                    Edit
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {show && (
        <YourModal
          id={id}
         
          editpershift={currentShift}
          closeModal={() => {
            setShow(false);
          }}
          update={() => {
            getSectionById();
          }}
        />
      )}
      {shows && (
        <EditModalDetail
        id={updateShift}
        update={() => {
          getSectionById();
        }}
        shiftdata={shiftData}
        updateId={update_id}
        closeModal={() => {
          setShows(false);
          setUpdateShift(null)
          setShiftData(null);
          setUpdateId(null)
        }}
        />
      )}
      {
        display && <CommentModal
         rowId={update_id}
         updateId={updateShift}
         previousComment={comment}
          closeModal={() => {
            setDisplay(false);
            setUpdateShift(null)
            setShiftData(null);
            setUpdateId(null)
          }}
          update={() => {
            getSectionById();
          }}
          shiftId={updateShift}
        />
      }
    </div>
  );
}

export default AddSection;
