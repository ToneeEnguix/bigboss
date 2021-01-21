import CreateAccountForm from "../components/CreateAccountForm";
/** @jsx jsx */
import { jsx } from "@emotion/core";
/* eslint-disable no-unused-vars */
var React = require("react");
/* eslint-enable no-unused-vars */

function CreateAccount() {
  return (
    <div css={createAccountWrapper}>
      <CreateAccountForm />
    </div>
  );
}

const createAccountWrapper = {
  display: "flex",
  justifyContent: "center",
};

export default CreateAccount;
