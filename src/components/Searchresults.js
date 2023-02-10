import React from "react";
import "../styles/Job.css";

import Searchresultitem from "./Searchresultitem";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
class SearchResults extends React.Component {
  state = {
    searchData: "",
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    this.props.SearchBarData(this.state.searchData);
    this.props.getDynamicData();
  };

  loactionChange = (e) => {
    if (e.target.value === "Select Location") {
      this.props.LocationInfo("");
    } else {
      this.props.LocationInfo(e.target.value);
    }
    document.getElementById("dropDown").disabled = true;
  };
  onInputChange = (e) => {
    this.setState({ searchData: e.target.value });
  };
  componentDidMount() {
    this.props.getDynamicData();
  }
  NetworkIssue = () => {
    this.props.getDynamicData();
  };
  render() {
    const AllfilterResults = this.props.searchResultData;

    if (AllfilterResults.length >= 1) {
      var Allresults = AllfilterResults.map((eachItem) => {
        return (
          <Searchresultitem
            renderLink={true}
            searchResultData={eachItem}
            key={eachItem.id}
          />
        );
      });
    } else if (AllfilterResults.length === 0) {
      Allresults = (
        <div style={{ color: "#ffffff" }}>
          <img
            src={"https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "}
            width={400}
            height={270}
            alt="noJobsFound"
          />
          <div className="NoJobFoundDiv">
            <p>No Jobs Found</p>
            <span>We could not find any jobs. Try other filters...</span>
          </div>
        </div>
      );
    }

    let data;
    if (this.props.Loader == true && this.props.ApiStatus == false) {
      data = (
        <div className="Loader2">
          <Loader
            className="loader"
            type="ThreeDots"
            color="#ffffff"
            height={30}
            width={40}
          />
        </div>
      );
    } else if (this.props.Loader == false && this.props.ApiStatus == false) {
      data = <div className="AllResults">{Allresults}</div>;
    } else if (this.props.Loader == false && this.props.ApiStatus == true) {
      data = (
        <div className="NetworkIssueDiv">
          <img
            src={"https://assets.ccbp.in/frontend/react-js/failure-img.png"}
            alt="notFoundPageImg"
            width={500}
            height={350}
          />
          <p className="IssueP1">Oops! Something Went Wrong</p>
          <p className="IssueP2">
            we cannot seem to find the page you are looking for.
          </p>
          <button onClick={this.NetworkIssue}>Retry</button>
        </div>
      );
    }
    return (
      <>
        <div className="jobResultSearch">
          <form className="jobResultSearch1" onSubmit={this.onFormSubmit}>
            <input
              id="inpEle"
              placeholder="Search"
              onChange={this.onInputChange}
              type="search"
            />
            <button type="submit">Search</button>
          </form>
          <select
            id="dropDown"
            onChange={this.loactionChange}
            className="locationSelect"
          >
            <option>Select Location</option>
            <option>Hyderabad</option>
            <option>Bangalore</option>
            <option>Chennai</option>
            <option>Kolkata</option>
            <option>Mumbai</option>
            <option>Pune</option>
            <option>Delhi</option>
            <option>Kerala</option>
          </select>
        </div>
        <div className="resultsMainDiv"> {data}</div>
      </>
    );
  }
}

export default SearchResults;
