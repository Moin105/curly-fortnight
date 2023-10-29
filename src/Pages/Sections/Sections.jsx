import React, { useEffect, useState } from "react";
import "./styles.css";
import Layout from "../../Layout/Layout";
import axios from "axios";
import SectionBox from "../../Components/SectionBox/SectionBox";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Sections() {
  const API_ENDPOINT = "http://23.22.32.42/api";
  const [sections, setSections] = useState([]);
  const token = useSelector((state) => state.userAuth.token);
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

  useEffect(() => {
    getSections();
  }, []);

  return (
    <div>
      <Layout>
        <div className="sections-container">
          <h2>Sections</h2>
          <div className="section-wrapper">
            {sections.length > 0 ? (
              sections.map((section) => (
                <Link
                  to={`/sections/add-section/${section.id}`}
                  className="alink"
                >
                  <SectionBox
                    key={section.id}
                    index={section.id}
                    id={section.id}
                    title={section.name}
                    sectionsUpdate={getSections}
                  />
                </Link>
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
