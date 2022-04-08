import React, { useState } from "react";
import styles from "./Search.module.css"
import { debounce } from "lodash";


// App.js에 검색어를 보내주는 걸 받아주는 거 추가하고.
// 검색어가 null이 아니면, 기존 세팅 무시하고 없애고 결과 창으로!
// "'~~'에 대한 검색결과"로 보여주기. state랑 같이

const debounceSomethingFunc = debounce((onSearchChange, value) => {
  console.log("called debounceSomethingFunc");
  onSearchChange(value);
}, 500);

function Search ({onSearchChange}) {
  const [text, setText] = useState("");
  const [click, setClick] = useState(false);

  const onChange = (e) => {
    const value = e.target.value;
    setText(value);
    debounceSomethingFunc(onSearchChange, value);
  }

  const onClick = () => {
    setClick(!click);
  }

  return (
    <div className={styles.test}>
      <div>
        <span>Todo List</span>
        {click ?
          <input type="text" value={text} onChange={onChange} />
          : null 
        }
        <button onClick = {onClick}>검색</button>
      </div>
    </div>
  )
}

export default Search;