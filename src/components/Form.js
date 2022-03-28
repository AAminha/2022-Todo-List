import React, { useEffect, useState } from "react";
import None from "components/None";
import Reday from "components/Reday";
import Ongoing from "components/Ongoing";
import Done from "components/Done";

function Form({ item }) {


  return(
    <div>
      <div>Form</div>
      <None
        item={item}
      />
      {/*<Reday />
      <Ongoing />
      <Done />*/}
    </div>
  )
}

export default Form;