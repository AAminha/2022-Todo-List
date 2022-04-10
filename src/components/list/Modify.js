import React, { useEffect, useRef } from "react";
import styles from "components/css/MakeInput.module.css"

const Modify = ({ id, input, onKeyPress, onChange, onOutClick }) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onOutClick);

  return (
    <div ref={wrapperRef} className={styles.input_form}>
      <input
        className={styles.new_input}
        value={input}
        onChange={onChange}
        onKeyPress={(e) => onKeyPress(e, id)}
      />
    </div>
  )
}

function useOutsideAlerter(ref, onOutClick) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default Modify;