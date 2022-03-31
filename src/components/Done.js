import React, { useState } from "react";
import MakeInput from "./MakeInput";
import ShowItem from "./ShowItem";

const Done = ({ listData, input, onRemove, onChange,
  onKeyPress}) => {

  const [click, setClick] = useState(false);
  const onShow = listData
    .filter((data) => data.state =='done')
    .map(({id, value}) => (
      <ShowItem
        key={id}
        id={id}
        value={value}
        onRemove={onRemove}
      />
    ));

  const onClick = () => {
    setClick(!click);
  }

  return (
    <div>
      <span>=== 상태 없음(None) ===</span>
      <div>
        {onShow}
      </div>
      {click ?
        <MakeInput
          input={input}
          onKeyPress={onKeyPress}
          onChange={onChange}
          state="done"
        />
        : null}
      <button onClick={onClick}>+ 새로 만들기</button>
      <div>===================</div>
    </div>
  )
}

export default Done;