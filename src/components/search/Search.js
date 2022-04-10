import React, { useState } from "react";
import styles from "components/css/Search.module.css"
import { debounce } from "lodash";

const debounceSomethingFunc = debounce((onSearchChange, value) => {
  onSearchChange(value);
}, 500);

function Search ({onSearchChange}) {
  const [text, setText] = useState("");

  const onChange = (e) => {
    const value = e.target.value;
    setText(value);
    debounceSomethingFunc(onSearchChange, value);
  }

  return (
    <div className={styles.search_main_form}>
      <span className={styles.text}>Todo List</span>
      <input
        className={styles.search_input}
        type="text"
        value={text} 
        placeholder="입력하세요"
        onChange={onChange} 
      />
    </div>
  )
}

export default Search;