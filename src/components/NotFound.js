import React from "react";
import "./Notfound.css";
import Cookie from "js-cookie";
import { Redirect } from "react-router-dom";
class NotFound extends React.Component {
  Home = () => {
    const { history } = this.props;
    history.replace("/");
  };
  render() {
    const jwtToken = Cookie.get("JobbyjwtToken");
    if (jwtToken === undefined) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="NotFoundDiv">
        <img
          src={
            "https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          }
          alt="notFoundPageImg"
        />
        <div className="notFoundContentDiv">
          <p>Page Not Found</p>
          <span>
            we are sorry, the page you requested could not be found...
          </span>
          <span>Please go back to the Home Page</span>
          <button onClick={this.Home}>Home</button>
        </div>
      </div>
    );
  }
}

export default NotFound;
