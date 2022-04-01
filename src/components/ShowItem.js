import React, { useEffect, useState, useRef } from "react";
import styles from "./ShowItem.module.css";

const ShowItem = ({ id, value, onRemove }) => {
  const [moreClick, setMoreClick] = useState(false);

  const onClick = () => {
    setMoreClick(!moreClick);
  }
  
  return(
    <div className={styles.list_form}>
      <div className={styles.list_data}>{value}</div>
      <button className={styles.more_btn} onClick={onClick}>...</button>
      {moreClick ? 
        <Element
          onRemove={onRemove}
          id={id}
          onClick={onClick}
        /> : null
      }
    </div>
  )
}

function Element({ id, onRemove, onClick }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onClick);

  return (
    <div ref={wrapperRef} className={styles.more_element}>
      <div className={styles.list_modify} onClick= {(e) => {
        e.stopPropagation()
        //onModify()가 들어올 예정
      }}>"수정"</div>
      <div className={styles.list_remove} onClick = {(e) => {
        e.stopPropagation()
        onRemove(id)}
      }>"제거"</div>
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