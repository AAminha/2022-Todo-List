import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "components/Form";

function App() {
  const [list, setList] = useState(null);

  useEffect(() => {
    getList();
  }, []);

  const getList = async() => {
    await axios.get("https://my-json-server.typicode.com/jaewoong2/recruiting/0")
    .then(data => {
      setList(data.data);
    });
  }

  return (
    <div>
      <Form
        list={list}
      />
    </div>
  );
}

export default App;