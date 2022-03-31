import React from "react";

const ShowItem = ({ id, value, onRemove }) => {
  
  return(
    <div>
      <div>{value}</div>
      <div onClick= {(e) => {
        e.stopPropagation()
        //onModify()가 들어올 예정
      }}
      >"수정"</div>
      <div onClick = {(e) => {
        e.stopPropagation()
        onRemove(id)}
      }>"제거"</div>
    </div>
  )
}


export default ShowItem;