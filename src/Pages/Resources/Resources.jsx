import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../../Layout/Layout";
import {AiFillCloseCircle} from 'react-icons/ai'
import Modal from "./Modal";
import { Link } from "react-router-dom";
import { current } from "@reduxjs/toolkit";
function Resources() {
  const [resourcesCategories, setResourcesCategories] = useState([]);
  const API_ENDPOINT = "http://23.22.32.42/api";
  const [show, setShow] = useState(false);
  const [currentResourceCategory, setCurrentResourceCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useSelector((state) => state.userAuth.token);
  const [name, setName] = useState("");
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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

  useEffect(() => {
    return () => {
      getResourcesCategory();
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
  return (
    <div>
      <Layout>
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
                return <span onClick={()=>{setCurrentResourceCategory(category)}}>{category.name}</span>;
              })}
            </div>
          </div>
      {currentResourceCategory &&    <div className="rowss">
            <h2>{currentResourceCategory.name}</h2>
            <div className="categories">
            <AiFillCloseCircle onClick={()=>{setCurrentResourceCategory(null)}}/>
            </div>
          </div>}
          <div className="resources-wrapper">
            <button onClick={()=>{setShow(true)}}>
              Add Resource
            </button>
            <table class="blueTable">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Name </th>
                  <th>Ability </th>
                  <th>Assigned Section</th>
                  <th>Assigned By</th>
                  <th className="long"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td className="blue"> wefwefwef</td>
                  <td className="green">Shift 1 (08:00 AM -01:00 PM)</td>
                  <td>ewfewfwefewfwefewf</td>
                  <td>wfwefwefefwe</td>
                  <td className="long"></td>
                </tr>
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
    </div>
  );
}

export default Resources;
