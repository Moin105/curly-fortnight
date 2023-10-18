import React from "react";
import "./styles.css";
import Layout from "../../Layout/Layout";
function ActivityLog() {
  return (
    <div>
      {" "}
      <Layout>
        <div className="activitylog-container">
          <h2>Activity Log</h2>
          <div className="activity-wrapper">
            <table class="blueTable">
              <thead>
                <tr>
                  <th><input  type='checkbox'/></th>
                  <th >User </th>
                  <th>Role </th>
                  <th className="long">Activity</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input  type='checkbox'/></td>
                  <td className="blue"> wefwefwef</td>
                  <td>ewfwefwe</td>
                  <td className="underline">ewfewfwefewfwefewf</td>
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

export default ActivityLog;
