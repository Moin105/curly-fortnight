import React from "react";
import SectionHeader from "../../Components/Header/SectionHeader";
import "./styles.css";
function AddSection() {
  return (
    <div className="add-section-container">
      <SectionHeader />
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter the name of Section"
          className="section-name-input"
        />
        <button className="add-section-btn">Save</button>
      </div>
      <table class="blueTable">
        <thead>
          <tr>
            <th>Date</th>
            <th>Shift</th>
            <th>Needs</th>
            <th className="long">Name of Staff</th>
            <th>Hrs</th>
            <th>Comments</th>
            <th className="short"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>cell1_1</td>
            <td>
              <td className="thf">wew</td>
              <td className="thf">wefwe</td>
              <td className="thf">wefwef</td>
            </td>
            <td>
            <td className="thf">wew</td>
              <td className="thf">wefwe</td>
              <td className="thf">wefwef</td>
            </td>
            <td>
            <td className="thf">wew</td>
              <td className="thf">wefwe</td>
              <td className="thf">wefwef</td>
            </td>
            <td>
            <td className="thf">wew</td>
              <td className="thf">wefwe</td>
              <td className="thf">wefwef</td>
            </td>
            <td>
            <td className="thf">wew</td>
              <td className="thf">wefwe</td>
              <td className="thf">wefwef</td>
            </td>
            <td>
              <td></td>
              <td></td>
              <td></td>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AddSection;
