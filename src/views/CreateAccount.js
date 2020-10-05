import React from 'react';
import CreateAccountForm from "../components/CreateAccountForm";
/** @jsx jsx */
import { jsx } from '@emotion/core';


const createAccountWrapper={
  display:"flex",
  justifyContent:"center"
}
function CreateAccount() {
  return (
    <div css={createAccountWrapper}>
    <CreateAccountForm/>

    </div>
  );
}

export default CreateAccount;