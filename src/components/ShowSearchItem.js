import React from "react";

function ShowSearchItem({item}) {
  return (
    <div>
      <div>{item.state}</div>
      <div>{item.value}</div>
    </div>
  )
}

export default ShowSearchItem;