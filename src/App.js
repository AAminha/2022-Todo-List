import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "components/Form";

function App() {
  const [item, setItem] = useState(null);

  useEffect(() => {
    getList();
  }, []);

  const getList = async() => {
    await axios.get("https://my-json-server.typicode.com/jaewoong2/recruiting/0")
    .then(data => {
      setItem(data.data);
    });
  }

  return (
    <div>
      <Form
        item={item}
      />
    </div>
  );
}

export default App;