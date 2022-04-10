import React, { useEffect, useState, useRef } from "react";
import styles from "components/css/ShowItem.module.css";
import { FiMoreHorizontal } from "react-icons/fi";

const ShowItem = ({id, value, onRemove, onModify, 
onDragStart, onDragOver, onDragLeave, onDrop, onDragEnter, onDragEnd}) => {

  const [moreClick, setMoreClick] = useState(false);

  const onMoreClick = () => {
    {console.log("onMoreClick 실행")}
    {console.log(!moreClick)}
    setMoreClick(!moreClick);
  }

  return (
    <div
      key={id}
      className={styles.list_form}
      draggable={true}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      data-position={id}
    >
      {console.log(value)}
      {console.log(moreClick)}
      <div className={styles.list_data}>{value}</div>
      <button 
        className={moreClick ? styles.more_btn_on : styles.more_btn_off}
        onClick={onMoreClick}
      >
        <FiMoreHorizontal/>
      </button>
      {moreClick ? 
        <Element
          id={id}
          onRemove={onRemove}
          onModify={onModify}
          onMoreClick={onMoreClick}
          setMoreClick={setMoreClick}
        /> : null
      }
      {console.log("===============")}
    </div>
  )
}

function Element({ id, onRemove, onModify, onMoreClick, setMoreClick }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onMoreClick );

  return (
    <div ref={wrapperRef} className={styles.more_element}>
      <div className={styles.list_item} onClick= {(e) => {
        e.stopPropagation()
        onModify(id)
      }}>수정</div>
      <div className={styles.list_item} onClick = {(e) => {
        e.stopPropagation()
        onRemove(id)
        setMoreClick(false)
      }}>제거</div>
    </div>
  );
}

function useOutsideAlerter(ref, onMoreClick) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onMoreClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}


export default ShowItem;