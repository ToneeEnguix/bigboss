import React, { useEffect, useState, useContext } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Redirect, useParams,useLocation } from "react-router-dom"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Counter from "../utils/Counter";
import GenerateSecurityQuestion from "../utils/GenerateSecurityQuestion";
import ShowCorrectButton from "../utils/ShowCorrectButton";
import { ReactComponent as BigBossLogo } from "../resources/BigBossLogo.svg";
import { get } from "../api/fetch";
import UserContext from "../context/UserContext";
import bigbossblue from "../resources/bigbossblue.png"


const imageColumn = {


  margin: "0 3rem",
  minWidth: "600px",

}

const detailsColumn = {


  padding: "0 4vw",
  marginRight: "3rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "-1px 4px 22px 0px black",
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
  const [correctAnswer, setcorrectAnswer] = useState(false)
  const [data, setData] = useState({ pictures: [], description: [] })
  const [amount, setAmount] = useState("01");
  const { id } = useParams();
  const context = useContext(UserContext);

  useEffect(() => {


    if (props.location.state === undefined) {

      getData();

    }
    else {
      setData(props.location.state.competition);
    }

  }, [])

  const getData = async () => {

    const result = await get(`/competitions/read/${id}`);

    if (result.ok) {

      setData(result.data);
    }
    else {
      setError(true)
    }
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

    if (amount !== "01") {
      const newValue = setValue(Number(amount) - 1)
      setAmount(newValue)
    }
  }

  const regenerateQuestion = () => {

    setQuestion(!question);


  }

  const checkAnswer = async (answer) => {

    if (answer === false) {

      setcorrectAnswer(false);
    }
    else {

      setcorrectAnswer(true);

    }
  }

  const resetAnswer = () => {

    setcorrectAnswer(false);

  }

  if (error) {
    return (
      <Redirect to={"/home"} />
    )
  }


  return (

    <div css={{ display: "flex", marginTop: "3rem", justifyContent: "space-between" }}>
      <div css={imageColumn}>
        <Carousel showStatus={false} showThumbs={false} showArrows={false}>
          {data.pictures.map((picture, index) => {

            return (
              <div key={index} css={{ width: "100%" }}>
                <img css={image} key={index} src={picture} />

              </div>)
          }
          )}
        </Carousel>
        <img css={image} src={data.pictures[3]} />
      </div>
      <div css={detailsColumn}>
        <h1 css={{ marginTop: "2rem", fontSize: "2rem", textAlign: "center" }}>{data.title}</h1>
        <h3 css={{ margin: "1rem 0 2rem 0", color: "#00FFFF" }}>ONLY £{data.ticketPrice} PER ENTRY</h3>
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
          <GenerateSecurityQuestion checkAnswer={checkAnswer} question={question} />
        </div>

        <ShowCorrectButton regenerateQuestion={regenerateQuestion} resetAnswer={resetAnswer} correctAnswer={correctAnswer} amount={Number(amount)} data={data} ticketsAvailable={data.ticketsAvailable} />

        <div css={{ width: "100%" }}>

          <h4 css={{
            marginTop: "2rem",
            color: "#00FFFF",
            fontSize: "0.9rem",
            letterSpacing: "0.1rem",
            marginBottom: "1rem"
          }}>DESCRIPTION</h4>
          {data.description.map(line => {

            return (

              <p key={line} css={{ padding: "0.5rem 0", textTransform: "uppercase" }}>{line}</p>
            )
          })}
          <h4 css={{
            marginTop: "2rem",
            color: "#00FFFF",
            fontSize: "0.7rem",
            letterSpacing: "0.1rem",
            marginBottom: "1rem"
          }}>MAXIMUM NUMBER OF ENTRIES</h4>
          <strong css={{ fontSize: "0.8rem" }}>{data.maxTickets}</strong>

        </div>
        <img css={{ width: "9rem", padding: "2rem", marginBottom: "1rem" }} src={bigbossblue} />
      </div>
      <Modal active={context.showPurchaseAlert} />
    </div>
  );
}

export default CompetitionDetails;


const Modal = (props) => {

  const context = useContext(UserContext);

  if (context.showPurchaseAlert.status === true) {
    return (

      <div onClick={context.hideModal} css={{
        position: "fixed",
        top: "0",
        left: "0",
        backgroundColor: "rgba(255, 255, 255, 0.5)",

        width: "100%",
        height: "100vh"
      }}>

      </div>

    )
  }
  else {
    return (<React.Fragment></React.Fragment>)
  }
}