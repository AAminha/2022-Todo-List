import React, { useEffect, useState } from "react";
import Done from "./Done";

function None({item}) {
  const [list, setList] = useState([]);
  const [test, setTest] = useState([{value:"안녕123", time:"1"}]);
  const [click, setClick] = useState(false);

  useEffect(() => {
    /*if(localStorage.getItem('none') == null) {
      setList([]);
    } else {
      setList(localStorage.getItem('none'))
    }*/

  }, [])

  const testShow = () => {

  }

  const saveData = () => {
    /*const data = {
      value:"test2"
    }
    if(list.length === 0) {
      localStorage.setItem('none', JSON.stringify([].concat(data)));
    } else {
      localStorage.setItem('none', JSON.stringify(list.concat(data)));
    }
    setList(list.concat(data));*/
    const data = {
      value:"반가워456",
      time:"2"
    }
    setTest(test.concat(data));
  }

  const getData = () => {
    setList(localStorage.getItem('none'));
  }

  const onClick = () => {
    setClick(!click);
  }

  /*return (
    <div>
      <div>
        <span>상태 없음(None)</span>
        <span>{list.length}</span>
        {console.log("list : " + list)}
      </div>
      <button onClick={() => saveData()}>+ 새로 만들기</button>
    </div>
  )*/

  return (
    <div>
      <div>
        <span>상태 없음(None)</span>
      </div>
      <div>
        {test.map((item) => (
          <ShowItem
            key={item.time}
            item={item.value}
          />
        ))}
      </div>
      {click ? <MakeInput /> : null}
      <button onClick={onClick}>+ 새로 만들기</button>
    </div>
  )
}

function ShowItem ({item}) {
  return(
    <div>
      {item}
    </div>
  )
}

function MakeInput () {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onCreate();
    }
  }

  const onCreate = () => {
    let today = new Date();
    setTodos(todos.concat({
      id : today.toLocaleString(),
      text: input
    }))
    setInput('');
  }

  const onChange = (e) => {
    const {
      target : { value }
    } = e;
    setInput(value);
  }

  return (
    <form>
      <input
        type="text"
        placeholder="제목을 입력하세요"
        value={input}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      {console.log(todos)}
    </form>
  )
}

export default None;