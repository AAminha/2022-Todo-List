import React, { useEffect, useState, useRef } from "react";
import styles from "./ShowItem.module.css";
import { FiMoreHorizontal } from "react-icons/fi";

const ShowItem = ({ id, value, onRemove, onModify }) => {
  const [moreClick, setMoreClick] = useState(false);
  const [grab, setGrab] = useState(null);

  const setDragItemId = 1;
  const onClick = () => {
    setMoreClick(!moreClick);
  }

  const onDragOver = e => {  // onDrop 이벤트 활성화를 위해
    e.preventDefault();
  }

  const onDragStart = e => {
    {console.log("onDragStart")}
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget);
    console.log(e.currentTarget)
  }

  /* const onDragEnter = (e: React.DragEvent<HTMLElement>): void => {
    setDragItemId.interSectItem(todo.id);
  } */

  // https://watermelonlike.tistory.com/entry/Drag-n-Drop-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98?category=861516

  const onDragEnd = e => {
    {console.log("onDragEnd")}
    console.log(e.document);
    console.log(e.target)
    e.dataTransfer.dropEffect = "move";
  }

  const onDragDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    {console.log("onDragDrop")}
    //let grabPosition = Number(grab.dataset.position);
    //let targetPosition = Number(e.target.dataset.position);

    //let _list = [ ...lists ];
    //_list[grabPosition] = _list.splice(targetPosition, 1, _list[grabPosition])[0];

    //setLists(_list);
  }

  return(
    <div
      className={styles.list_form}
      
      onDragOver={onDragOver}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrop={onDragDrop}

      draggable={true}
    >
      <div className={styles.list_data}>{value}</div>
      <button 
        className={moreClick ? styles.more_btn_on : styles.more_btn_off}
        onClick={onClick}
      ><FiMoreHorizontal/></button>
      {moreClick ? 
        <Element
          onRemove={onRemove}
          onModify={onModify}
          id={id}
          onMoreClick={onClick}
        /> : null
      }
    </div>
  )
}

function Element({ id, onRemove, onClick, onModify }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onClick);

  return (
    <div ref={wrapperRef} className={styles.more_element}>
      <div className={styles.list_item} onClick= {(e) => {
        e.stopPropagation()
        onModify(id)
      }}>수정</div>
      <div className={styles.list_item} onClick = {(e) => {
        e.stopPropagation() // 부모 엘리먼트에게 이벤트 전달을 중단해야 할 때 쓰임.
        onRemove(id)}
      }>제거</div>
    </div>
  );
}

// ref : 특정 노드나 컴포넌트에 레퍼런스 값을 만들어주는 것
/*
  다른 곳을 클릭할 시 div 요소 보여주지 않는 기능 추가
  참고 링크 :
  https://velog.io/@he1256/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%ED%8A%B9%EC%A0%95-%EC%98%81%EC%97%AD-%EC%99%B8%EB%B6%80-%ED%81%B4%EB%A6%AD-%EC%8B%9C-%EA%B0%90%EC%A7%80-%EB%B0%8F-%EB%8F%99%EC%9E%91-%EA%B5%AC%ED%98%84-React-useRef-useEffect-%EC%B0%B8%EC%A1%B0
*/
function useOutsideAlerter(ref, onClick) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        {console.log("뭐")}
        onClick();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}


export default ShowItem;