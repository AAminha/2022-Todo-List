import React from "react";
import None from "components/None";
import Reday from "components/Reday";
import Ongoing from "components/Ongoing";
import Done from "components/Done";

function Form({list}) {
  return(
    <div>
      <div>Form</div>
      <None />
      <Reday />
      <Ongoing />
      <Done />
    </div>
  )
}

export default Form;