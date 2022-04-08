import React, { useState } from "react";
import MakeInput from "./MakeInput";
import ShowItem from "./ShowItem";
import styles from "./Common.module.css"
import Modify from "./Modify";

const Form = ({ listData, onRemove, onChange, onCreate, onModify, state, kor }) => {

  const [click, setClick] = useState(false);
  const [input, setInput] = useState('');
  const [modifyId, setModifyId] = useState('');

  const onClickModify = (id) => {
    console.log("onModify 본체 실행 중")
    console.log(id)
    setModifyId(id)
    setInput(listData.filter((element) => element.id === id)[0].value)
  }

  // 리스트를 보여주는 역할
  /* const onShow = listData
    .filter((data) => data.state == state)
    .map(({id, value}) => (
      <ShowItem
        key={id}
        id={id}
        value={value}
        onRemove={onRemove}
        onModify={onModify}
      />
    )); */

  // 
  const onClick = () => {
    setClick(!click);
    {console.log("Form의 onClick 실행중")}
    setInput('');
  }

  // 새로운 리스트 내용 입력한 뒤 enter 인식 역할
  const onCreateKeyPress = (e, state) => {
    if (e.key === 'Enter') {
      onCreate(state);
      setClick(false);
      setInput('');
    }
  }

  const onModifyKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      onModify(id);
      setInput('');
      setModifyId('');
    }
  }

  // 
  const onInputChange = (e) => {
    setInput(e.target.value);
    onChange(e.target.value);
  }

  // 리스트가 수정모드일 때 보여주는 역할
  /* const onModify = listData
  .filter((data) => data.state == state)
  .map(() => (
    <Modify
      input={input}
      onKeyPress={onModifyKeyPress}
      onChange={onInputChange}
      onClick={onClick}
    />
  )); */

  // 리스트에서 수정버튼이 클릭되어졌을 때 발생되는 함수
  /* const onClickModify = (id) => {
    setModifyMode(!modifyMode);
    setInput(listData.filter((element) => element.id === id).value)
  } */

  const onShow = listData
    .filter((data) => data.state == state)
    .map(({id, value}) => {
      if(id !== modifyId) {
        return (<ShowItem
          key={id}
          id={id}
          value={value}
          onRemove={onRemove}
          onModify={onClickModify}
        />)
      } else {
        return (<Modify
          key={id}
          id={id}
          input={input}
          onKeyPress={onModifyKeyPress}
          onChange={onInputChange}
          onClick={onClick}
        />)
      }
    });

  return (
    <div className={styles.section_form}>
      <span>=== {state} / {kor} ===</span>
      <div>
        {/* {modifyMode ? onModify : onShow} */}
        {onShow}
      </div>
      <div className={styles.new_input_form}>
        {click ?
          <MakeInput
            input={input}
            onKeyPress={onCreateKeyPress}
            onChange={onInputChange}
            onClick={onClick}
            state={state}
          /> : null}
        </div>
      <button className={styles.new_btn} onClick={onClick}>+ 새로 만들기</button>
      <div>===================</div>
    </div>
  )
}

export default Form;