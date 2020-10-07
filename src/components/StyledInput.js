import React from 'react';
/* @jsx jsx */
import { jsx } from '@emotion/core/';


export default class StyledInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: "" };

        this.handleChange = this.handleChange.bind(this);
    }

    

    handleChange(event) {
        this.setState({ value: event.target.value });

    }

    render() {


        return (
            <div css={{
                display: "flex",
                flexDirection: "column",
                width: this.props.width,


                "label": {
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

"input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus,input:-webkit-autofill:active":  {
       boxShadow:"0 0 0 30px #252525 inset !important;",
       "-webkit-text-fill-color":"white !important"
    },

    "label span": {

        fontWeight: "600",
        padding: "0 3px",
        width: "100%",

    },

    "input": {
        width: "100%",
        display: "block",
        position: "relative",
        background: "none",
        padding: "1rem",
        outline: "none",
        border: this.props.valid,
        zIndex: "2",
        margin: "0.25rem 0"

    },

    "input:focus, input:valid,": {
        outline: "none"

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
    }
}}>
                <input onChange={this.handleChange} type={this.props.type}  value={this.state.value} disabled={this.props.disabled} required  name={this.props.innerName}></input>
                <label htmlFor={this.props.name} ><span>{this.props.name} </span></label>

            </ div >
        )
    }
}

StyledInput.defaultProps = {
    valid: "2px solid #00C6D6",
  }

