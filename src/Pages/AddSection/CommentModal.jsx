import React,{useEffect, useState} from 'react'
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import axios from 'axios';
function CommentModal({rowId, closeModal, previousComment,updateId,update}) {
    // const [comment, setComment] = useState("");
    const API_ENDPOINT = "http://23.22.32.42/api";
    const token = useSelector((state) => state.userAuth.token);

    const [formData, setFormData] = useState({
        // section_id: id,
        // date: "",
        _method:"put",
        shift_id: 1,
        comment: "",
      });
      useEffect(() => {
       if(previousComment && previousComment !== "" || previousComment !== null){
        setFormData(prevData => ({
            ...prevData,
            comment: previousComment
        }
            ))
       }
      }, [])
      
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
      const handleSubmit = () => {
        console.log(previousComment)
        postApiData()
        update()
        closeModal()
    }
  return (
    <div>
    <p>My Row is {rowId}</p>
    <p>My Shift  is {updateId}</p>
    <div className="modal">
      <div className="modal-contents">
        <h2>Enter Comment</h2>
        <div className="row">
          <label>
            {/* Comment  */}
            <textarea
              type="text"
              className="input"
              style={{borderRadius:"5px",height:"100px"}}
              name="date"
              value={formData.comment}
              onChange={(e) => {
                setFormData(prevData => ({
                  ...prevData,
                  comment: e.target.value
                }));
              }}            />
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
                // section_id: id,
                // date: "",
                _method:"put",
                shift_id: '',
                comment: "",
              
              })
              closeModal();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
    
    </div>
  )
}

export default CommentModal