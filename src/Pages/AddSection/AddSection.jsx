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
import BackHeader from "../../Components/Header/BackHeader";
function AddSection() {
  const [sectionDates, setSectionDates] = useState([]);
  const [comment, setComment] = useState("");
  const [userInput, setUserInput] = useState("");
  const [shows, setShows] = useState(false);
  const [updateShift, setUpdateShift] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [display, setDisplay] = useState(false);
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
  const API_ENDPOINT = "https://api.upscalemsgroup.com/api";
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
  const [update_id, setUpdateId] = useState(null);
  const [currentShift, setCurrentShift] = useState(null);
  const handleEdit = (shift) => {
    // setCurrentShift(shift);
    console.log("shiftdata", shift.id, shift);
    setUpdateShift(shift);

    setShows(true);
  };

  const role = useSelector((state) => state.userAuth?.user?.roles[0]?.name); // Assuming the role is obtained from state

  return (
    <div className="add-section-container">
      <BackHeader link={'/sections'}/>
      {/* <SectionHeader id={id} /> */}
      <ToastContainer />
      {id ? (
        <>
          {role == "user" ? (
            ""
          ) : (
            <div className="rowss">
              <div className="categories">
                <div className="rin">
                  <button onClick={() => {}}>Previous Dates</button>
                </div>
              </div>
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
              </div>
            </div>
          )}
        </>
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
      <table className="blueTable" style={{ margin: "20px 0px 0px 0px" }}>
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
                {data.section_details.map((detail, shiftIndex) => (
                  <>{detail?.shift?.name ? <p>{detail?.shift?.name}</p> : ''}</>
                ))}

            
              </td>
              <td>
                {data.section_details.map((detail, shiftIndex) => (
                <>{detail?.shift?.name ?  <p>{detail?.need}</p>:''}</>
                ))}
           
              </td>
              <td>
                {data.section_details.map((detail, shiftIndex) => (
            <> {  detail?.shift?.name ?   <p>
                    {detail.users.length > 0 ? (
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
                  </p> : ''}</>
                ))}
            
              </td>
              <td>
                {data.section_details.map((detail, shiftIndex) => (
                 <>{detail?.shift?.name ?    <p>{detail.hour}</p>: ''}</>
                ))}
             
              </td>
              <td>
                {data.section_details.map((detail, shiftIndex) => (
               <>{detail?.shift?.name ?        <p
                    onClick={() => {
                      setDisplay(true);
                      setComment(detail.comment);
                      console.log("comment show", detail);
                      setUpdateShift(detail.shift_id);
                      setUpdateId(data.id);
                    }}
                  >
                    {" "}
                    <FcComments />
                  </p>: ''}</>
                ))}
              </td>
              <td>
                {data.section_details.map((detail, shiftIndex) => (
                <>{detail?.shift?.name ?       <span>
                    {" "}
                    <button
                      className="edit"
                      onClick={() => {
                        handleEdit(data);
                        setShiftData(detail);
                        setUpdateShift(detail.shift_id);
                        setUpdateId(data.id);
                      }}
                    >
                      Edit
                    </button>
                  </span>: ''}</>
                ))}
                {/* <span>
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
                </span> */}
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
            setUpdateShift(null);
            setShiftData(null);
            setUpdateId(null);
          }}
        />
      )}
      {display && (
        <CommentModal
          rowId={update_id}
          updateId={updateShift}
          previousComment={comment}
          closeModal={() => {
            setDisplay(false);
            setUpdateShift(null);
            setShiftData(null);
            setUpdateId(null);
          }}
          update={() => {
            getSectionById();
          }}
          shiftId={updateShift}
        />
      )}
    </div>
  );
}

export default AddSection;
