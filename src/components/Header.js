import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../styles/Header.css";
import Cookie from "js-cookie";
import LogoutModel from "./LogoutModel";
class Header extends React.Component {
  state = {
    open: false,
  };
  logOut = () => {
    this.setState({ open: true });
  };
  MainLogout = () => {
    Cookie.remove("JobbyjwtToken");
    const { history } = this.props;
    history.push("/login");
    this.setState({ open: false });
  };
  Home = () => {
    const { history } = this.props;
    history.push("/");
  };

  HomeClick = () => {
    this.setState({ focusHome: true, focusJob: false });
  };
  JobClick = () => {
    this.setState({ focusHome: false, focusJob: true });
  };
  render() {
    return (
      <>
        <div className="headerDiv">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            width={100}
            height={35}
            onClick={this.Home}
            className="appLogo"
            alt="appLogo"
          />
          <div className="spanDiv">
            <Link
              to="/"
              className={this.state.focusHome && "addHighlight"}
              onClick={this.HomeClick}
            >
              <span>Home</span>
            </Link>

            <Link
              to="/Jobs"
              className={this.state.focusJob && "addHighlight"}
              onClick={this.JobClick}
            >
              <span>Jobs</span>
            </Link>
          </div>
          <button onClick={this.logOut}>Logout</button>
        </div>
        <div>
          <LogoutModel
            message="Are you sure that you want to Logout?"
            isOpen={this.state.open}
            onClose={() => this.setState({ open: false })}
            onLogOut={this.MainLogout}
          />
        </div>
      </>
    );
  }
}

export default withRouter(Header);
