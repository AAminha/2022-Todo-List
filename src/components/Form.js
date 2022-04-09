import React, { useEffect, useState } from "react";
import MakeInput from "./MakeInput";
import ShowItem from "./ShowItem";
import styles from "./Form.module.css"
import Modify from "./Modify";

const Form = ({ state }) => {

  const [click, setClick] = useState(false);
  const [input, setInput] = useState('');
  const [modifyId, setModifyId] = useState('');
  const [listData, setListData] = useState(JSON.parse(localStorage.getItem(state)));
  const [changeState, setChangeState] = useState(state);

  useEffect(() => {
    switch(state) {
      case 'done' : setChangeState('완료'); break;
      case 'none' : setChangeState('상태 없음'); break;
      case 'ready' : setChangeState('시작 전'); break;
      case 'ongoing' : setChangeState('진행 중'); break;
      default : break;
    }
  }, [])

  const updateData = () => {
    setListData(JSON.parse(localStorage.getItem(state)))
  }

  const onClickModify = (id) => {
    setModifyId(id);
    setInput(listData[id]);
  }

  // 
  const onClick = () => {
    setClick(!click);
    setInput('');
  }

  const onOutClick = () => {
    {console.log(input)}
    {console.log("저기요")}
    setInput('');
    setModifyId('');
  }

  // 새로운 리스트 내용 입력한 뒤 enter 인식 역할
  const onCreateKeyPress = (e) => {
    if (e.key === 'Enter') {
      //onCreate(state, stateId);
      var tempData = listData;
      tempData.push(input);
      localStorage.setItem(state, JSON.stringify(tempData));
      setClick(false);
      setInput('');
    }
  }

  const onModifyKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      var tempData = listData;
      tempData[id] = input;
      localStorage.setItem(state, JSON.stringify(tempData));
      setInput('');
      setModifyId('');
    }
  }

  const onInputChange = (e) => {
    {console.log(input)}
    setInput(e.target.value);
  }

  const onRemove = (id) => {
    var tempData = listData;
    tempData.splice(id, 1);
    localStorage.setItem(state, JSON.stringify(tempData));
    updateData();
  }

  const onShow = listData.map((item, index) => {
    if(index !== modifyId) {
      return (
        <ShowItem
          key={index}
          id={index}
          value={item}
          onRemove={onRemove}
          onModify={onClickModify}
        />
      )
    } else {
      return (
        <Modify
          key={index}
          id={index}
          input={input}
          onKeyPress={onModifyKeyPress}
          onChange={onInputChange}
          onClick={onOutClick}
        />
      )
    } 
  });

  return (
    <div className={styles.state_section_form}>
      <div className={styles.state_section}>
        <span className={styles.state_section_name}>{changeState}</span>
        <span className={styles.state_section_count}>{listData.length}</span>
      </div>
      <div>
        {onShow}
      </div>
      <div className={styles.new_input_form}>
        {click ?
          <MakeInput
            input={input}
            onKeyPress={onCreateKeyPress}
            onChange={onInputChange}
            onClick={onClick}
          /> : null}
        </div>
      <button
        className={styles.new_btn}
        onClick={onClick}
      >
          + 새로 만들기
      </button>
    </div>
  )
}

export default Form;