import React, { useEffect, useState } from "react";
import MakeInput from "components/list/MakeInput";
import ShowItem from "components/list/ShowItem";
import Modify from "components/list/Modify";
import styles from "components/css/Form.module.css"

const Form = ({ state }) => {

  const [click, setClick] = useState(false);
  const [input, setInput] = useState('');
  const [modifyId, setModifyId] = useState(-1);
  const [listData, setListData] = useState(JSON.parse(localStorage.getItem(state)));
  const [changeState, setChangeState] = useState(state);
  const [list, setList] = useState(listData);
  const [dragAndDrop, setDragAndDrop] = useState({
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: [],
  });

  useEffect(() => {
    switch(state) {
      case 'done' : setChangeState('완료'); break;
      case 'none' : setChangeState('상태 없음'); break;
      case 'ready' : setChangeState('시작 전'); break;
      case 'ongoing' : setChangeState('진행 중'); break;
      default : break;
    }
  }, []);

  const updateData = (st) => {
    setListData(JSON.parse(localStorage.getItem(st)))
  }

  const onClickModify = (id) => {
    setModifyId(id);
    setInput(listData[id]);
  }

  const onNewBtnClick = () => {
    setClick(!click);
    setInput('');
  }

  const onOutClick = () => {
    setInput('');
    setModifyId(-1);
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
      setModifyId(-1);
      updateData(state);
    }
  }

  const onInputChange = (e) => {
    setInput(e.target.value);
  }

  const onRemove = (id) => {
    var tempData = listData;
    tempData.splice(id, 1);
    localStorage.setItem(state, JSON.stringify(tempData));
    updateData(state);
  }

  const onDragStart = (event) => {
    const initialPosition = parseInt(event.currentTarget.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      originalOrder: list,
    });
  };

  // 드래그하면서 마우스가 대상 객체의 위에 자리 잡고 있을 때 발생함.
  const onDragOver = (event) => {
    event.preventDefault();
    let newList = dragAndDrop.originalOrder;   
    const draggedFrom = dragAndDrop.draggedFrom;					   // 드래그 되는 항목의 인덱스(시작)
    const draggedTo = parseInt(event.currentTarget.dataset.position);  // 놓을 수 있는 영역의 인덱스(끝)
    const itemDragged = newList[draggedFrom];						   
    const remainingItems = newList.filter(			// draggedFrom(시작) 항목 제외한 배열 목록 
      (item, index) => index !== draggedFrom
    );
    newList = [										// 드래그 시작, 끝 인덱스를 활용해 새로운 배열로 반환해줌
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];
    if (draggedTo !== dragAndDrop.draggedTo) {		// 놓을 수 있는 영역이 변경 되면 객체를 변경해줌
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };

  const onDragLeave = (event) => {
    event.currentTarget.classList.remove("over");
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: null,
    });
  };

  const onDrop = (event) => {
    setList(dragAndDrop.updatedOrder);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
    });
    if (dragAndDrop.draggedFrom !== null) {
      localStorage.setItem(state, JSON.stringify(dragAndDrop.updatedOrder))
    updateData(state);
    }
  };

  const onDragEnter = (event) => {
    event.currentTarget.classList.add("over");
  };

  const onDragEnd = (event) => {
    const listItems = document.querySelectorAll(".draggable");
    listItems.forEach((item) => {
      item.classList.remove("over");
    });
  };

  const onShow = listData.map((item, index) => {
    if(index !== modifyId) {
      return (
        <ShowItem
          key={index}
          id={index}
          value={item}
          onRemove={onRemove}
          onModify={onClickModify}
          onOutClick={onOutClick}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onDragEnter={onDragEnter}
          onDragEnd={onDragEnd}
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
          onOutClick={onOutClick}
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
            onClick={onNewBtnClick}
          /> : null}
        </div>
      <button className={styles.new_btn} onClick={onNewBtnClick}>
          + 새로 만들기
      </button>
    </div>
  )
}

export default Form;