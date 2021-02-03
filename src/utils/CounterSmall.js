import { Component } from "react";
// import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import facepaint from "facepaint";
const breakpoints = [576, 950, 992, 1200];
/* eslint-disable no-unused-vars */
var React = require("react");
/* eslint-enable no-unused-vars */

const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

/**
 * Note :
 * If you're using react v 15.4 or less
 * You can directly import PropTypes from react instead.
 * Refer to this : https://reactjs.org/warnings/dont-call-proptypes.html
 */

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    };
  }

  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);

      if (date) {
        this.setState(date);
      } else {
        this.stop();
        this.props.setRedraw();
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) {
      return false;
    }

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= 365.25 * 86400) {
      // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) {
      // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = "0" + value;
    }
    return value;
  }

  render() {
    const countDown = this.state;

    return (
      <div css={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <h5
          css={mq({
            width: ["90%", "100%", "100%", "100%"],
            textAlign: ["center", "left", "left", "left"],
            letterSpacing: "0.2rem",
            fontWeight: "600",
            fontSize: "0.5rem",
          })}
        >
          NEXT DRAW LIVE ON FACEBOOK IN {this.addLeadingZeros(countDown.days)}{" "}
          DAYS / {this.addLeadingZeros(countDown.hours)} HRS /{" "}
          {this.addLeadingZeros(countDown.min)} MIN /{" "}
          {this.addLeadingZeros(countDown.sec)} SEC{" "}
        </h5>
      </div>
    );
  }
}

export default Countdown;
