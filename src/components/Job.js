import React from "react";
import Header from "./Header";
import "../styles/Job.css";
import Searchfilter from "./Searchfilter";
import Searchresults from "./Searchresults";
import Cookie from "js-cookie";
import { Redirect } from "react-router-dom";
import Pagination from "./Pagination";
import { useState, useEffect } from "react";

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

    let ApiUrl = `https://apis.ccbp.in/jobs?`;

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

        let dropDown = document.getElementById("dropDown");
        dropDown.disabled = false;
        dropDown.value = "Select Location";
      })
      .catch((err) => {
        setApiStatus(true);
        setLoader(false);
      });
  };

  useEffect(() => {
    let includeLocation;

    includeLocation = searchResultData.filter((eachItem) => {
      return eachItem.location.includes(locationDetail);
    });
    setsearchResultData(includeLocation);
    setsearchResultDataPerPage(includeLocation.slice(0, 5));
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
