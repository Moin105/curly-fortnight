import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
function SectionBox({ title }) {
  return (
    <>
      {/* <Link to={`/sections/${title}`}> */}
        <div className="section-box">
          <span>edit</span>
          <h2>{title}</h2>
        </div>
      {/* </Link> */}
    </>
  );
}

export default SectionBox;
