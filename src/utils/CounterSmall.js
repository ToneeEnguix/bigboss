import React, { Component } from 'react';
import PropTypes from 'prop-types';
/** @jsx jsx */
import { jsx } from '@emotion/core';


/**
 * Note : 
 * If you're using react v 15.4 or less
 * You can directly import PropTypes from react instead. 
 * Refer to this : https://reactjs.org/warnings/dont-call-proptypes.html
 */

const number = {

    margin: "1rem",
    boxShadow: "-1px 4px 22px 0px rgba(0,0,0,16%)",
    width: "60px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",



    "strong": { letterSpacing: "0.4rem" }

}

const description = {

    fontSize: "0.5rem",
    fontWeight: "600",
    color: "#868686"
}


const countBox = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

}


class Countdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            days: 0,
            hours: 0,
            min: 0,
            sec: 0,
        }
    }

    componentDidMount() {
        // update every second
        this.interval = setInterval(() => {
            const date = this.calculateCountdown(this.props.date);
            date ? this.setState(date) : this.stop();
        }, 1000);
    }

    componentWillUnmount() {
        this.stop();
    }

    calculateCountdown(endDate) {
        let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

        // clear countdown when date is reached
        if (diff <= 0) return false;

        const timeLeft = {
            years: 0,
            days: 0,
            hours: 0,
            min: 0,
            sec: 0
        };

        // calculate time difference between now and expected date
        if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
            timeLeft.years = Math.floor(diff / (365.25 * 86400));
            diff -= timeLeft.years * 365.25 * 86400;
        }
        if (diff >= 86400) { // 24 * 60 * 60
            timeLeft.days = Math.floor(diff / 86400);
            diff -= timeLeft.days * 86400;
        }
        if (diff >= 3600) { // 60 * 60
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
            value = '0' + value;
        }
        return value;
    }

    render() {
        const countDown = this.state;

        return (
            <div css={{ display: "flex", justifyContent: "center", }}>
                <h5 css={{fontWeight:"600", fontSize:"0.7rem"}}>NEXT DRAW LIVE ON FACEBOOK IN {this.addLeadingZeros(countDown.days)} DAYS/ {this.addLeadingZeros(countDown.hours)} HRS/ {this.addLeadingZeros(countDown.min)} MIN/ {this.addLeadingZeros(countDown.sec)} SEC </h5>
            </div>


        );
    }
}

Countdown.propTypes = {
    date: PropTypes.string.isRequired
};


export default Countdown;