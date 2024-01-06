import React, { useEffect, useState } from "react";
import "./styles.css";
import Layout from "../../Layout/Layout";
import axios from "axios";
import SectionBox from "../../Components/SectionBox/SectionBox";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearchData, clearSearchData } from "../../Redux/Slices/searchSlice";

function Sections() {
  const API_ENDPOINT = "https://api.upscalemsgroup.com/api";
  // /
  const [sections, setSections] = useState([]);
  const token = useSelector((state) => state.userAuth.token);
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.search.searchData);

  const getSections = async () => {
    const response = await axios.get(`${API_ENDPOINT}/sections`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    setSections(data.sections);
  };

  useEffect(() => {
    getSections();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  // Filter sections based on the search query
  const filteredSections = sections.filter((section) =>
    section.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Layout setSearchQuery={setSearchQuery} facility={getSections}>
        <div className="sections-container">
          <h2 className="h2">Facility</h2>
          <div className="section-wrapper">
            {filteredSections.length > 0 ? (
              filteredSections.map((section) => (
                <div className="alink">
                  <SectionBox
                    key={section.id}
                    index={section.id}
                    id={section.id}
                    title={section.name}
                    sectionsUpdate={getSections}
                  />
                </div>
              ))
            ) : (
              <h2 style={{ width: "100%", textAlign: "center" }}>
                No Sections Found
              </h2>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Sections;
