import React from "react";
import Header from "./Header";
import "../styles/Home.css";
import Cookie from "js-cookie";
import { Redirect } from "react-router-dom";
import facebook from "../icons/fb.svg";
import twitter from "../icons/twitter.svg";
import instagram from "../icons/insta.svg";
import whatsapp from "../icons/whatsapp.svg";
import linkdin from "../icons/linkdin.svg";
import Job from "../icons/Job.svg";
// import productHunt from "../icons/productHunt.svg";
class Home extends React.Component {
  state = {
    covidADD: true,
    Cookies: true,
  };
  covidAddremove = () => {
    this.setState({ covidADD: false });
  };
  CookieRemove = () => {
    this.setState({ Cookies: false });
  };
  findJob = () => {
    const { history } = this.props;
    history.push("/jobs");
  };
  render() {
    const jwtToken = Cookie.get("JobbyjwtToken");
    if (jwtToken === undefined) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="Main">
        <div className="homeDiv">
          <Header />
          {this.state.covidADD && (
            <div className="Covid19">
              <div>
                <h1>Our response to COVID-19</h1>
                <p>
                  Priority COVID-19 supplies for organizations on the
                  frontlines.
                </p>
                <a href="https://covid19.who.int/">Learn more</a>
              </div>
              <div className="iconDiv">
                {/* <i
                  class="glyphicon glyphicon-remove"
                  onClick={this.covidAddremove}
                ></i> */}
                <svg
                  className="iconSvg"
                  height="20"
                  width="45"
                  onClick={this.covidAddremove}
                >
                  <path
                    id="AB"
                    d="M 10 10 l 11 10"
                    stroke="white"
                    stroke-width="2.5"
                  ></path>
                  <path
                    id="CD"
                    d="M 10 20 l 11 -10"
                    stroke="white"
                    stroke-width="2.5"
                  ></path>
                </svg>
              </div>
            </div>
          )}

          <div className="homeContent">
            <p className="p1">Find The Job Thats Fits Your Life</p>
            <p className="p2">
              Millions of people are searching for jobs, salary, information and
              company reviews. Find the job that fits your abilites and
              potential
            </p>
            <button onClick={this.findJob}>Find Jobs</button>
          </div>
        </div>
        <div className="usagePer">
          <h1>65</h1>
          <p className="p1">of the top Fortune 100 companies</p>
          <p className="p2">
            We serve millions of Job Seekers across all states in 9 countries,
            including the U.S., Canada, United Kingdom, Germany, France, Italy,
            Spain, Japan, and India
          </p>
        </div>
        {this.state.Cookies && (
          <div className="cookies">
            <p>
              We use cookies to ensure that we give you the best experience on
              our website. If you continue to use this sitewe will assume that
              you are happy with it.
            </p>
            <button onClick={this.CookieRemove}>I Agree</button>
          </div>
        )}
        <div className="Footer">
          <div className="footerHeader">
            <img src={Job} width={50} height={70} />
            <p>Jobbies</p>
          </div>

          <span>The only thing we are serious about is JOB</span>
          <span>Contact us on</span>
          <div className="footerLogoDiv">
            <img src={linkdin} width={40} height={40} />
            <img src={whatsapp} width={40} height={40} />
            <img src={instagram} width={40} height={40} />
            <img src={twitter} width={40} height={40} />
            <img src={facebook} width={40} height={40} />
            {/* <img src={productHunt} width={40} height={40} /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
