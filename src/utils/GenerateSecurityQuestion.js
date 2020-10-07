import React, { useEffect, useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';

const number = {

    margin: "1rem",
    boxShadow: "15px 10px 30px 0px rgba(0,0,0,16%)",
    width: "60px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    cursor: "pointer",
}

const selectedNumber = {

    margin: "1rem",
    boxShadow: "15px 10px 30px 0px rgba(0,0,0,16%)",
    width: "60px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    cursor: "pointer",
    border:"1px solid #00C6D6"
}

const areEqual = (prevProps, nextProps) => prevProps.regenerate === nextProps.regenerate;

export default React.memo(props => {

   
    const logAnswer = (value) => {

        if (correctResult === value) {
            props.checkAnswer(true);
        }
        else {

            props.checkAnswer(false)
        }


    }

    const operators = [{
        sign: "+", method: function (a, b) { return a + b; }
    }, {
        sign: "-",
        method: function (a, b) { return a - b; }
    },
    {
        sign: "x",
        method: function (a, b) { return a * b; }
    }]


    let shuffledResults = [];
    const randomOperator = Math.floor(Math.random() * 3);
    const randomNumber01 = Math.floor(Math.random() * 9);
    const randomNumber02 = Math.floor(Math.random() * 9);
    const stringOperation = `${randomNumber01} ${operators[randomOperator].sign} ${randomNumber02}`;
    const correctResult = operators[randomOperator].method(randomNumber01, randomNumber02);
    let results = new Set([correctResult]);

    while (results.size < 4) {

        results.add(Math.floor(Math.random() * Math.floor(Math.random() * 20)));

    }

    shuffledResults = shuffle(Array.from(results));


    return (
        <React.Fragment>
            <Results shuffledResults={shuffledResults} stringOperation={stringOperation} logAnswer={logAnswer}/>
        </React.Fragment>
    )
}, areEqual)

const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;



}

const Results=(props)=>{

    const [selected, setSelected] = useState(undefined);

    const logAnswer=(element,index)=>{

        setSelected(index)

        props.logAnswer(element)


    }

return(
    <React.Fragment>
    <h3 css={{ fontSize: "0.7rem", marginTop: "1rem", letterSpacing: "0.2rem" }}>SECURITY QUESTION: WHAT IS {props.stringOperation}?</h3>

    <div css={{ display: "flex" }}>
        {props.shuffledResults.map((element, index) => {

            if (index !== selected) {
                return (
                    <div onClick={() => {logAnswer(element, index) }} key={index} css={number}>
                        <strong>
                            {element}
                        </strong>
                    </div>)
            }
            else{
                return (
                    <div onClick={() => { props.logAnswer(element, index) }} key={index} css={selectedNumber}>
                        <strong>
                            {element}
                        </strong>
                    </div>)


            
        }})}
    </div>
    </React.Fragment>
)
}