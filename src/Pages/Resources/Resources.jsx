import React from "react";
import "./styles.css";
import Layout from "../../Layout/Layout";
function Resources() {
  return (
    <div>
      <Layout>
        <div className="resources-container">
          <div className="rows">
            <h2>Resources</h2>
            <div className="categories">
              <span>asdas</span>
              <span>asdas</span>
              <span>asdas</span>
            </div>
          </div>
          <div className="resources-wrapper">
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
    </div>
  );
}

export default Resources;
