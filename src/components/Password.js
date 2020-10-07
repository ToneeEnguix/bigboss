import React from 'react';
/* @jsx jsx */
import { jsx } from '@emotion/core/';
import StyledInput from "./StyledInput";


function Password() {
  return (
    <div css={{backgroundColor:"red"}}>
     <StyledInput/>
     <StyledInput/>
     <StyledInput/>
     <h1>GOGO</h1>
    </div>
  );
}

export default Password;