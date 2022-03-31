import React from "react";

const MakeInput = ({ state, input, onKeyPress, onChange }) => {

  return (
    <>
    <input
      placeholder="제목을 입력하세요"
      value={input}
      onChange={onChange}
      onKeyPress={(e) => onKeyPress(e, state)}
    />
    </>
  )
}

export default MakeInput;