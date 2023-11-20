// import React, { useEffect, useState } from "react";
// import "./styles.css";
// import Layout from "../../Layout/Layout";
// import axios from "axios";
// import SectionBox from "../../Components/SectionBox/SectionBox";
// import { Link } from "react-router-dom";
// import { useSelector,useDispatch } from "react-redux";
// import { setSearchData, clearSearchData } from "../../Redux/Slices/searchSlice";
// function Sections() {
//   const API_ENDPOINT = "http://23.22.32.42/api";
//   const [sections, setSections] = useState([]);
//   const token = useSelector((state) => state.userAuth.token);
//   const getSections = async () => {
//     const response = await axios.get(`${API_ENDPOINT}/sections`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = response.data;
//     console.log(data);
//     setSections(data.sections);
//   };
//   // search functionality 
//   const dispatch = useDispatch();
//   const searchData = useSelector((state) => state.search.searchData);
//   // const handleSearch = (searchValue) => {
//   //   // Logic to filter your data based on the searchValue
//   //   // Assuming you have dataA, dataB, ..., dataH arrays
//   //   const filteredData = yourFilterLogic(searchValue, dataA); // Example for dataA
//   //   dispatch(setSearchData(filteredData));
//   // };

//   const handleClearSearch = () => {
//     dispatch(clearSearchData());
//   };
//   const role = useSelector((state) => state.userAuth?.user?.roles[0]?.name); 
//   useEffect(() => {
//     getSections();
//   }, []);
//   const [searchQuery, setSearchQuery] = useState("");
//   console.log("searchData", searchQuery)
//   return (
//     <div>
//       <Layout setSearchQuery={setSearchQuery}>

//         <div className="sections-container">
//           <h2>Sections</h2>
//           <div className="section-wrapper">
//             {sections.length > 0 ? (
//               sections.map((section) => (
//                 <Link
//                   to={`/sections/add-section/${section.id}`}
//                   className="alink"
//                 >
//                   <SectionBox
//                     key={section.id}
//                     index={section.id}
//                     id={section.id}
//                     title={section.name}
//                     sectionsUpdate={getSections}
//                   />
//                 </Link>
//               ))
//             ) : (
//               <h2 style={{ width: "100%", textAlign: "center" }}>
//                 No Sections Found
//               </h2>
//             )}
//           </div>
//         </div>
//       </Layout>
//     </div>
//   );
// }

// export default Sections;
import React, { useEffect, useState } from "react";
import "./styles.css";
import Layout from "../../Layout/Layout";
import axios from "axios";
import SectionBox from "../../Components/SectionBox/SectionBox";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearchData, clearSearchData } from "../../Redux/Slices/searchSlice";

function Sections() {
  const API_ENDPOINT = "http://23.22.32.42/api";
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
      <Layout setSearchQuery={setSearchQuery}>
        <div className="sections-container">
          <h2>Facility</h2>
          <div className="section-wrapper">
            {filteredSections.length > 0 ? (
              filteredSections.map((section) => (
                <Link to={`/sections/add-section/${section.id}`} className="alink">
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
