import React, { useState } from "react";
import MakeInput from "./MakeInput";
import ShowItem from "./ShowItem";
import styles from "./Common.module.css"

const None = ({ listData,  onRemove, onChange,
  onCreate}) => {

  const [click, setClick] = useState(false);
  const [input, setInput] = useState('');

  const onShow = listData
    .filter((data) => data.state =='none')
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
      <span>=== 상태 없음(None) ===</span>
      <div>
        {onShow}
      </div>
      <div className={styles.new_input_form}>
        {click ?
          <MakeInput
            input={input}
            onKeyPress={onKeyPress}
            onChange={onInputChange}
            onClick={onClick}
            state="none"
          /> : null}
        </div>
      <button className={styles.new_btn} onClick={onClick}>+ 새로 만들기</button>
      <div>===================</div>
    </div>
  )
}

// 추가해야하는 사항 : 새로 만들기 클릭하고 다른 곳 클릭하면 없애기

export default None;