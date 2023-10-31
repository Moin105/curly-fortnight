import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SectionHeader from "../../Components/Header/SectionHeader";
import "./styles.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import YourModal from "./DetailModal";
function AddSection() {
  const [sectionDates, setSectionDates] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [tableData, setTableData] = useState([]);
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.userAuth.token);
  const { id } = useParams();
  const [sectionName, setSectionName] = useState("");

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

  const handleEdit = (index) => {
    setEditableRow(index);
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

          // Implement logic to filter 'staff_ids' based on the updated 'need'
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
          {/* <button >Add Row</button> */}
          {/* <div>
            <label htmlFor="dates">Select a date:</label>
            <select id="dates" value={selectedDate} onChange={handleDateChange}>
              {availableDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div> */}
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
                <p>{data.section_details[0]?.shift?.name}</p>
                <p>{data.section_details[1]?.shift?.name}</p>
                <p>{data.section_details[2]?.shift?.name}</p>
              </td>
              <td>
                <p>{data.section_details[0]?.need?data.section_details[0]?.need :"0"}</p>
                <p>{data.section_details[1]?.need?data.section_details[1]?.need :"0"}</p>
                <p>{data.section_details[2]?.need?data.section_details[2]?.need :"0"}</p>
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
                    <span>No user assigned</span>
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
                    <span>No user assigned</span>
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
                    <span>No user assigned</span>
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
                <p>
                  {data.section_details[0]?.comment
                    ? data.section_details[0]?.comment
                    : "No Comment Added Yet"}
                </p>
                <p>
                  {data.section_details[1]?.comment
                    ? data.section_details[1]?.comment
                    : "No Comment Added Yet"}
                </p>
                <p>
                  {data.section_details[2]?.comment
                    ? data.section_details[2]?.comment
                    : "No Comment Added Yet"}
                </p>
              </td>
              <td>
                <p>
                  {" "}
                  <button onClick={() => handleEdit(index)}>Edit</button>{" "}
                </p>
                <p>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                </p>
                <p>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                </p>
              </td>
              {/* {data?.section_details?.map((detail, detailIndex) => (
                <td>
                  <td>{detail.shift.name}</td>
                  <td>{detail.need}</td>
                  <td className="long">
                    {detail.users.length > 0 ? (
                      <ul>
                        {detail.users.map((user, userIndex) => (
                          <li key={userIndex}>{user.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No staff</p>
                    )}
                  </td>
                  <td>{detail.hour}</td>
                  <td>{detail.comment}</td>
                  {detailIndex === 0 && <td></td>}
                </td>
              ))} */}
            </tr>
          ))}
          {/* {tableData?.map((row, index) => {
            return (
              <tr key={index}>
                <td>
                  {editableRow === index ? (
                    <input
                      type="date"
                      value={row.date}
                      onChange={(e) =>
                        handleInputChange(e.target.value, "date", index)
                      }
                    />
                  ) : (
                    selectedDate
                  )}
                </td>
                <td>
                  {editableRow === index ? (
                    <input
                      type="text"
                      value={row.shift_id}
                      onChange={(e) =>
                        handleInputChange(e.target.value, "shift_id", index)
                      }
                    />
                  ) : (
                    row.shift_id
                  )}
                </td>
                <td>
                  {editableRow === index ? (
                    <input
                      type="number"
                      value={row.need}
                      onChange={(e) => {
                        handleInputChange(e.target.value, "need", index);
                        handleNeedChange(e.target.value, index);
                      }}
                    />
                  ) : (
                    row.need
                  )}
                </td>

                <td>
                  {editableRow === index ? (
                    <select
                      value={row.staff_ids}
                      onChange={(e) =>
                        handleInputChange(e.target.value, "staff_ids", index)
                      }
                    >
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    row?.users?.map((staffId) => {
                      const staff = users.find(
                        (user) => user.id === staffId.id
                      );
                      return <div key={staffId}>{staff ? staff.name : ""}</div>;
                    })
                  )}
                </td>
                <td>
                  {editableRow === index ? (
                    <input
                      type="number"
                      value={row.hour}
                      onChange={(e) => {
                        handleInputChange(e.target.value, "hour", index);
                        handleNeedChange(e.target.value, index);
                      }}
                    />
                  ) : (
                    row.hour
                  )}
                </td>
                <td>
                  {editableRow === index ? (
                    <input
                      type="text"
                      value={row.comment}
                      onChange={(e) => {
                        handleInputChange(e.target.value, "comment", index);
                        handleNeedChange(e.target.value, index);
                      }}
                    />
                  ) : (
                    row.comment
                  )}
                </td>

                <td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={handleSave}>Save</button>
                  </td>
                </td>
              </tr>
            );
          })} */}
        </tbody>
      </table>
      {show && (
        <YourModal
          id={id}
          closeModal={() => {
            setShow(false);
          }}
          update={() => {
            getSectionById();
          }}
        />
      )}
    </div>
  );
}

export default AddSection;
