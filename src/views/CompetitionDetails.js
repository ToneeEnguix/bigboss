import React, { useEffect, useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Redirect } from "react-router-dom"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Counter from "../utils/Counter";
import GenerateSecurityQuestion from "../utils/GenerateSecurityQuestion";
import ShowCorrectButton from "../utils/ShowCorrectButton";
import { ReactComponent as BigBossLogo } from "../resources/BigBossLogo.svg";

const imageColumn = {


  marginLeft: "3rem",
  maxWidth:"800px",

}

const detailsColumn = {

 
  padding:"0 4vw",
  marginRight: "3rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "15px 10px 30px 0px rgba(0,0,0,16%)",
}


const image = {

  width: "100%",
  borderRadius: "2%",
  margin: "1rem 0",
  maxHeight: "450px"
}

function CompetitionDetails(props) {

  const [error, setError] = useState(false);
  const [question, setQuestion] = useState(false)
  const [data, setData] = useState({ pictures: [], description: [] })
  const [amount, setAmount] = useState("00")

  useEffect(() => {

    if (props.location.state === undefined) {
      setError(true)
    }
    else {

      setData(props.location.state.competition);

    }
  })

  if (error) {
    return (
      <Redirect to={"/home"} />
    )
  }

  const setValue = (amount) => {
    let value = String(amount);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;

  }

  const add = () => {

    const newValue = setValue(Number(amount) + 1)
    setAmount(newValue)
  }

  const substract = () => {

    if (amount !== "00") {
      const newValue = setValue(Number(amount) - 1)
      setAmount(newValue)
    }
  }

  const checkAnswer = (answer) => {

    if (answer === false) {

     // setQuestion(!question);


    }
    else{

      alert("OK")
    }

  }
  return (

    <div css={{ display: "flex", marginTop: "3rem", justifyContent:"space-between" }}>
      <div css={imageColumn}>
        <Carousel showStatus={false} showThumbs={false} showArrows={false}>
          {data.pictures.map((picture, index) => {

            return (
              <div css={{width:"100%"}}>
                <img css={image} key={index} src={picture} />

              </div>)
          }
          )}
        </Carousel>
        <img css={image} src={data.pictures[3]} />
      </div>
      <div css={detailsColumn}>
        <h1 css={{ marginTop: "2rem", fontSize: "2rem" }}>{data.title}</h1>
        <h3 css={{ margin: "1rem 0 2rem 0", color: "#00C6D6" }}>ONLY £{data.ticketPrice} PER ENTRY</h3>
        <Counter date={data.dateFinishes} />
        <div css={{ display: "flex", alignItems: "center" }}>
          <div css={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1rem" }}>
            <p>TICKET</p>
            <p>QTY</p>
          </div>
          <button onClick={substract} className="roundButton">—</button>
          <button onClick={add} className="roundButtonBlue">+</button>
          <input className="inputAmount" value={amount} />
        </div>
        <div css={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <GenerateSecurityQuestion regenerate={question} checkAnswer={checkAnswer} />
        </div>

        <ShowCorrectButton ticketsAvailable={data.ticketsAvailable} />
        <div css={{width:"100%"}}>
       
            <h4 css={{marginTop:"2rem",
            color: "#00C6D6",
            fontSize:"0.9rem",
            letterSpacing:"0.1rem",
            marginBottom:"1rem"}}>DESCRIPTION</h4>
            {data.description.map(line => {

              return (

                <p css={{padding:"0.5rem 0",textTransform:"uppercase"}}>{line}</p>
              )
            })}
             <h4 css={{marginTop:"2rem",
            color: "#00C6D6",
            fontSize:"0.7rem",
            letterSpacing:"0.1rem",
            marginBottom:"1rem"}}>MAXIMUM NUMBER OF ENTRIES</h4>
            <strong css={{fontSize:"0.8rem"}}>{data.maxTickets}</strong>
           
        </div>
        <BigBossLogo css={{margin:"4rem 0 2rem 0"}}height={"65px"} width={"65px"}/>
      </div>
    </div>
  );
}

export default CompetitionDetails;