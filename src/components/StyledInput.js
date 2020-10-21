import React from "react";
/* @jsx jsx */
import { jsx } from "@emotion/core/";

const eyeposition = {
  position: "relative",
  top: "-3.6rem",
  left: "90%",
  cursor: "pointer",
  zIndex: "2",
  width: "fit-content",
};
export default class StyledInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", type: this.props.type };

    this.handleChange = this.handleChange.bind(this);
    this.showPass = this.showPass.bind(this);
    this.hidePass = this.hidePass.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  showPass() {
    this.setState({ type: "text" });
  }

  hidePass() {
    this.setState({ type: "password" });
  }

  render() {
    return (
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          width: this.props.width,

          label: {
            display: "block",
            position: "relative",
            top: "-2.3rem",
            left: "0.7rem",
            color: "#999",
            fontSize: "0.8rem",
            padding: "0",
            width: "fit-content",
            zIndex: "1",
            transition: "all 0.3s ease-out",
            outline: "none",
          },

          "input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus,input:-webkit-autofill:active": {
            boxShadow: "0 0 0 30px #252525 inset !important;",
            WebkitTextFillColor: "white !important",
          },

          "label span": {
            fontWeight: "600",
            padding: "0 3px",
            width: "100%",
          },

          input: {
            width: "100%",
            display: "block",
            position: "relative",
            background: "none",
            padding: "1rem",
            outline: "none",
            border: this.props.valid,
            zIndex: "2",
            margin: "0.25rem 0",
          },

          "input:focus, input:valid,": {
            outline: "none",
          },

          "input:disabled": {
            backgroundColor: "grey",
          },

          "input:focus + label,input:valid + label": {
            top: "-3.9rem",
            left: "0.7rem",
            fontSize: "0.8rem",
            backgroundColor: "transparent",
            zIndex: "3",
          },
        }}
      >
        <input
          onChange={this.handleChange}
          type={this.state.type}
          value={this.state.value}
          disabled={this.props.disabled}
          required
          name={this.props.innerName}
        ></input>
        <label htmlFor={this.props.name}>
          <span>{this.props.name} </span>
        </label>
        {this.props.eye && this.state.type === "password" ? (
          <span css={eyeposition} onClick={this.showPass}>
            <span className="material-icons">visibility_off</span>
          </span>
        ) : null}
        {this.props.eye && this.state.type === "text" ? (
          <span css={eyeposition} onClick={this.hidePass}>
            <span className="material-icons">visibility</span>
          </span>
        ) : null}
      </div>
    );
  }
}

StyledInput.defaultProps = {
  valid: "2px solid #00FFFF",
};
