import React, { useEffect, useRef } from "react";
import styles from "./MakeInput.module.css"

const MakeInput = ({ state, input, onKeyPress, onChange, onClick }) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onClick);

  return (
    <div ref={wrapperRef} className={styles.input_form}>
      <input
        className={styles.new_input}
        placeholder="제목을 입력하세요"
        value={input}
        onChange={onChange}
        onKeyPress={(e) => onKeyPress(e, state)}
      />
    </div>
  )
}

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

export default MakeInput;