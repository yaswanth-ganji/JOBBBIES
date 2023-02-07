// import React from "react";
// import Header from "./Header";
// import "../styles/Job.css";
// import Searchfilter from "./Searchfilter";
// import Searchresults from "./Searchresults";
// import Cookie from "js-cookie";
// import { Redirect } from "react-router-dom";
// import Pagination from "./Pagination";
// //just
// class Job extends React.Component {
//   state = {
//     searchResultData: [],
//     searchResultDataPerPage: [],
//     Loader: true,
//     salaryData: null,
//     checkBoxData: [],
//     searchBarData: "",
//     ApiUrl: `https://apis.ccbp.in/jobs`,
//     x: ``,
//   };

//   onSalaryData = (value) => {
//     this.setState({ salaryData: value });
//   };

//   onCheckBoxData = (value) => {
//     this.setState({ checkBoxData: value });
//   };
//   onSearchBarData = (value) => {
//     this.setState({ searchBarData: value });
//   };

//   dynamicApi = () => {
//     let ApiUrl = `https://apis.ccbp.in/jobs?`;
//     console.log(this.state.salaryData);
//     if (
//       this.state.salaryData === null &&
//       this.state.checkBoxData.length >= 1 &&
//       this.state.checkBoxData
//     ) {
//       ApiUrl = `https://apis.ccbp.in/jobs?employment_type=${this.state.checkBoxData.join()}&search=${
//         this.state.searchBarData
//       }`;
//     } else if (
//       this.state.salaryData != null &&
//       this.state.checkBoxData.length === 0
//     ) {
//       ApiUrl = `https://apis.ccbp.in/jobs?minimum_package=${this.state.salaryData}&search=${this.state.searchBarData}`;
//     } else if (
//       this.state.checkBoxData &&
//       this.state.checkBoxData.length >= 1 &&
//       this.state.salaryData != null
//     ) {
//       ApiUrl = `https://apis.ccbp.in/jobs?employment_type=${this.state.checkBoxData.join()}&minimum_package=${
//         this.state.salaryData
//       }&search=${this.state.searchBarData}`;
//     } else if (
//       this.state.salaryData === null &&
//       this.state.checkBoxData &&
//       this.state.checkBoxData.length === 0
//     ) {
//       ApiUrl = `https://apis.ccbp.in/jobs?&search=${this.state.searchBarData}`;
//     }
//     console.log(ApiUrl);
//     const JwtToken = Cookie.get("JobbyjwtToken");
//     let options = {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${JwtToken}`,
//       },
//     };

//     fetch(ApiUrl, options)
//       .then((res) => {
//         return res.json();
//       })
//       .then((jsonBody) => {
//         this.setState({
//           searchResultData: jsonBody.jobs,
//           searchResultDataPerPage: jsonBody.jobs.slice(0, 5),
//           Loader: false,
//         });
//       })
//       .catch((err) => {
//         console.log("errorTriggerd", err);
//       });
//   };

//   pageHandler = (pageNumber) => {
//     this.setState({
//       searchResultDataPerPage: this.state.searchResultData.slice(
//         pageNumber * 5 - 5,
//         pageNumber * 5
//       ),
//     });
//   };
//   render() {
//     console.log(this.state.searchBarData);
//     const jwtToken = Cookie.get("JobbyjwtToken");
//     if (jwtToken === undefined) {
//       return <Redirect to="/login" />;
//     }

//     return (
//       <div style={{ height: "100vh", background: "#000000" }}>
//         <Header />
//         <div className="jobDiv">
//           <div className="withApplyBtn">
//             <Searchfilter
//               salaryData={this.onSalaryData}
//               checkBoxData={this.onCheckBoxData}
//             />
//             <button onClick={this.dynamicApi} className="applyBtn">
//               Apply Filter
//             </button>
//           </div>
//           <div className="jobResults">
//             <Searchresults
//               getDynamicData={this.dynamicApi}
//               Loader={this.state.Loader}
//               searchResultData={this.state.searchResultDataPerPage}
//               SearchBarData={this.onSearchBarData}
//             />
//             {!this.state.Loader && (
//               <Pagination
//                 searchResultData={this.state.searchResultData}
//                 pageHandler={this.pageHandler}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Job;

import React from "react";
import Header from "./Header";
import "../styles/Job.css";
import Searchfilter from "./Searchfilter";
import Searchresults from "./Searchresults";
import Cookie from "js-cookie";
import { Redirect } from "react-router-dom";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const Job = () => {
  const [searchResultData, setsearchResultData] = useState([]);
  const [searchResultDataPerPage, setsearchResultDataPerPage] = useState([]);
  const [Loader, setLoader] = useState(true);
  const [ApiStatus, setApiStatus] = useState(false);
  const [salaryData, setsalaryData] = useState(null);
  const [checkBoxData, setcheckBoxData] = useState([]);
  const [searchBarData, setsearchBarData] = useState("");
  const [locationDetail, setLocationDetails] = useState("");

  const onSalaryData = (value) => {
    setsalaryData(value);
  };

  const onCheckBoxData = (value) => {
    setcheckBoxData(value);
  };
  const onSearchBarData = (value) => {
    setsearchBarData(value);
  };

  const onLocationInfo = (value) => {
    setLocationDetails(value);
  };
  useEffect(() => {
    dynamicApi();
  }, [searchBarData]);
  const dynamicApi = () => {
    setLoader(true);
    setApiStatus(false);
    // setApiStatus("INPROGRESS");
    let ApiUrl = `https://apis.ccbp.in/jobs?`;
    console.log(salaryData);
    if (salaryData === null && checkBoxData.length >= 1 && checkBoxData) {
      ApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkBoxData.join()}&search=${searchBarData}`;
    } else if (salaryData != null && checkBoxData.length === 0) {
      ApiUrl = `https://apis.ccbp.in/jobs?minimum_package=${salaryData}&search=${searchBarData}`;
    } else if (checkBoxData && checkBoxData.length >= 1 && salaryData != null) {
      ApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkBoxData.join()}&minimum_package=${salaryData}&search=${searchBarData}`;
    } else if (
      salaryData === null &&
      checkBoxData &&
      checkBoxData.length === 0
    ) {
      ApiUrl = `https://apis.ccbp.in/jobs?&search=${searchBarData}`;
    }
    console.log(ApiUrl);
    const JwtToken = Cookie.get("JobbyjwtToken");
    let options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${JwtToken}`,
      },
    };

    fetch(ApiUrl, options)
      .then((res) => {
        return res.json();
      })
      .then((jsonBody) => {
        setsearchResultData(jsonBody.jobs);
        setsearchResultDataPerPage(jsonBody.jobs.slice(0, 5));
        setLoader(false);
        setApiStatus(false);
        // setApiStatus("SUCCESS");
        let dropDown = document.getElementById("dropDown");
        dropDown.disabled = false;
        dropDown.value = "Select Location";
      })
      .catch((err) => {
        // setApiStatus("FAIL");
        setApiStatus(true);
        setLoader(false);
        console.log("errorTriggerd", err);
      });
  };

  useEffect(() => {
    let includeLocation;

    includeLocation = searchResultData.filter((eachItem) => {
      return eachItem.location.includes(locationDetail);
    });
    setsearchResultData(includeLocation);
    setsearchResultDataPerPage(includeLocation.slice(0, 5));
    console.log(includeLocation);
  }, [locationDetail]);

  const pageHandler = (pageNumber) => {
    setsearchResultDataPerPage(
      searchResultData.slice(pageNumber * 5 - 5, pageNumber * 5)
    );
  };

  const jwtToken = Cookie.get("JobbyjwtToken");
  if (jwtToken === undefined) {
    return <Redirect to="/login" />;
  }
  var Data;
  if (ApiStatus == "INPROGRESS") {
    Data = <div> INPROGRESS</div>;
  } else if (ApiStatus == "SUCCESS") {
    Data = (
      <div>
        {/* <Searchresults
          getDynamicData={dynamicApi}
          Loader={Loader}
          searchResultData={searchResultDataPerPage}
          SearchBarData={onSearchBarData}
          LocationInfo={onLocationInfo}
        /> */}
      </div>
    );
    // return Data;
  }
  console.log(locationDetail);
  return (
    <div style={{ height: "100vh", background: "#000000" }}>
      <Header />
      <div className="jobDiv">
        <div className="withApplyBtn">
          <Searchfilter
            salaryData={onSalaryData}
            checkBoxData={onCheckBoxData}
          />
          <button onClick={dynamicApi} className="applyBtn">
            Apply Filter
          </button>
        </div>
        <div className="jobResults">
          <Searchresults
            getDynamicData={dynamicApi}
            Loader={Loader}
            ApiStatus={ApiStatus}
            searchResultData={searchResultDataPerPage}
            SearchBarData={onSearchBarData}
            LocationInfo={onLocationInfo}
          />

          {!Loader && searchResultData.length > 0 && (
            <Pagination
              searchResultData={searchResultData}
              pageHandler={pageHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Job;

// import React from "react";
// import Header from "./Header";
// import "../styles/Job.css";
// import Searchfilter from "./Searchfilter";
// import Searchresults from "./Searchresults";
// import Cookie from "js-cookie";
// import { Redirect } from "react-router-dom";
// import Pagination from "./Pagination";
// import { useState, useEffect } from "react";

// import Loader from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// const Job = () => {
//   const [searchResultData, setsearchResultData] = useState([]);
//   const [searchResultDataPerPage, setsearchResultDataPerPage] = useState([]);
//   const [Loader, setLoader] = useState(true);
//   const [ApiStatus, setApiStatus] = useState("INITIAL");
//   const [salaryData, setsalaryData] = useState(null);
//   const [checkBoxData, setcheckBoxData] = useState([]);
//   const [searchBarData, setsearchBarData] = useState("");
//   const [locationDetail, setLocationDetails] = useState("");

//   const onSalaryData = (value) => {
//     setsalaryData(value);
//   };

//   const onCheckBoxData = (value) => {
//     setcheckBoxData(value);
//   };
//   const onSearchBarData = (value) => {
//     setsearchBarData(value);
//   };

//   const onLocationInfo = (value) => {
//     setLocationDetails(value);
//   };
//   useEffect(() => {
//     dynamicApi();
//   }, [searchBarData]);
//   const dynamicApi = () => {
//     setApiStatus("INPROGRESS");
//     let ApiUrl = `https://apis.ccbp.in/jobs?`;
//     console.log(salaryData);
//     if (salaryData === null && checkBoxData.length >= 1 && checkBoxData) {
//       ApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkBoxData.join()}&search=${searchBarData}`;
//     } else if (salaryData != null && checkBoxData.length === 0) {
//       ApiUrl = `https://apis.ccbp.in/jobs?minimum_package=${salaryData}&search=${searchBarData}`;
//     } else if (checkBoxData && checkBoxData.length >= 1 && salaryData != null) {
//       ApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkBoxData.join()}&minimum_package=${salaryData}&search=${searchBarData}`;
//     } else if (
//       salaryData === null &&
//       checkBoxData &&
//       checkBoxData.length === 0
//     ) {
//       ApiUrl = `https://apis.ccbp.in/jobs?&search=${searchBarData}`;
//     }
//     console.log(ApiUrl);
//     const JwtToken = Cookie.get("JobbyjwtToken");
//     let options = {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${JwtToken}`,
//       },
//     };

//     fetch(ApiUrl, options)
//       .then((res) => {
//         return res.json();
//       })
//       .then((jsonBody) => {
//         setsearchResultData(jsonBody.jobs);
//         setsearchResultDataPerPage(jsonBody.jobs.slice(0, 5));
//         setLoader(false);
//         setApiStatus("SUCCESS");
//         let dropDown = document.getElementById("dropDown");
//         dropDown.disabled = false;
//         dropDown.value = "Select Location";
//       })
//       .catch((err) => {
//         setApiStatus("FAIL");
//         console.log("errorTriggerd", err);
//       });
//   };

//   useEffect(() => {
//     let includeLocation;

//     includeLocation = searchResultData.filter((eachItem) => {
//       return eachItem.location.includes(locationDetail);
//     });
//     setsearchResultData(includeLocation);
//     setsearchResultDataPerPage(includeLocation.slice(0, 5));
//     console.log(includeLocation);
//   }, [locationDetail]);

//   const pageHandler = (pageNumber) => {
//     setsearchResultDataPerPage(
//       searchResultData.slice(pageNumber * 5 - 5, pageNumber * 5)
//     );
//   };

//   const jwtToken = Cookie.get("JobbyjwtToken");
//   if (jwtToken === undefined) {
//     return <Redirect to="/login" />;
//   }
//   var Data;
//   if (ApiStatus == "INPROGRESS") {
//     Data = <div style={{ color: "red" }}> INPROGRESS</div>;
//   } else if (ApiStatus == "SUCCESS") {
//     Data = (
//       <div style={{ color: "red" }}>
//         SUCCESS
//         <Searchresults
//           getDynamicData={dynamicApi}
//           Loader={Loader}
//           searchResultData={searchResultDataPerPage}
//           SearchBarData={onSearchBarData}
//           LocationInfo={onLocationInfo}
//         />
//       </div>
//     );
//   } else if (ApiStatus == "FAIL") {
//     Data = <div style={{ color: "red" }}> Fail</div>;
//   }
//   console.log(locationDetail);
//   return (
//     <div style={{ height: "100vh", background: "#000000" }}>
//       <Header />
//       <div className="jobDiv">
//         <div className="withApplyBtn">
//           <Searchfilter
//             salaryData={onSalaryData}
//             checkBoxData={onCheckBoxData}
//           />
//           <button onClick={dynamicApi} className="applyBtn">
//             Apply Filter
//           </button>
//         </div>
//         <div className="jobResults">
//           {Data}
//           {/* <Searchresults
//             getDynamicData={dynamicApi}
//             Loader={Loader}
//             searchResultData={searchResultDataPerPage}
//             SearchBarData={onSearchBarData}
//             LocationInfo={onLocationInfo}
//           /> */}

//           {/* {!Loader && searchResultData.length > 0 && (
//             <Pagination
//               searchResultData={searchResultData}
//               pageHandler={pageHandler}
//             />
//           )} */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Job;
