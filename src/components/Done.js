import React, { useState } from "react";
import MakeInput from "./MakeInput";
import ShowItem from "./ShowItem";
import styles from "./Common.module.css"

const Done = ({ listData, onRemove, onChange, onCreate }) => {

  const [click, setClick] = useState(false);
  const [input, setInput] = useState('');

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

  const onKeyPress = (e, state) => {
    if (e.key === 'Enter') {
      onCreate(state);
      setClick(false);
      setInput('');
    }
  }

  const onInputChange = (e) => {
    setInput(e.target.value);
    onChange(e.target.value);
  }

  return (
    <div className={styles.section_form}>
      <span>=== 완료(Done) ===</span>
      <div>
        {onShow}
      </div>
      {click ?
        <MakeInput
          input={input}
          onKeyPress={onKeyPress}
          onChange={onInputChange}
          state="done"
        />
        : null}
      <button className={styles.new_btn} onClick={onClick}>+ 새로 만들기</button>
      <div>===================</div>
    </div>
  )
}

export default Done;