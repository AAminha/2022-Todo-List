import React from "react";
import axios from "axios";
import None from "components/None";
import Ongoing from "components/Ongoing";
import Done from "components/Done";
import Ready from "components/Ready";

class App extends React.Component {

  state = {
    input : '',
    listData : [],  // GET통신을 통해 데이터를 받아와 화면에 반영
    initialData : []
  }

  handleCreate = (state) => {
    var today = new Date();
    const { input, listData } = this.state;
    this.setState({
      input : '',
      listData : listData.concat({
        value : input,
        state : state,
        id : today.toLocaleString()
      })
    })
  }

  handleKeyPress = (e, state) => {
    if (e.key === 'Enter') {
      this.handleCreate(state);
    }
  }

  handleRemove = (id) => {
    const { listData } = this.state;
    this.setState({
      listData : listData.filter(item => item.id !== id)
    });
  }

  handleChange = (e) => {
    this.setState({ input : e.target.value });
  }

  getList = async() => {
    var today = new Date();
    var list =[];
    await axios.get("https://my-json-server.typicode.com/jaewoong2/recruiting/0")
    .then(data => {
      data.data.map((current, index) => {
        const data = {
          value : current.value,
          state : current. state,
          id : today.toLocaleString()+index
        }
        list.push(data);
      })
    });
    this.setState({listData : list})
  }

  componentDidMount() {
    this.getList();
  }

  render() {
    const { listData, input } = this.state;
    const {
      handleCreate,
      handleRemove,
      handleKeyPress,
      handleChange
    } = this;
    
    return (
      <>
      {console.log(listData)}
        <None
          listData={listData}
          input={input}
          onRemove={handleRemove}
          onCreate={handleCreate}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <Ready
          listData={listData}
          input={input}
          onRemove={handleRemove}
          onCreate={handleCreate}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <Ongoing
          listData={listData}
          input={input}
          onRemove={handleRemove}
          onCreate={handleCreate}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <Done
          listData={listData}
          input={input}
          onRemove={handleRemove}
          onCreate={handleCreate}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </>
    );
  }
}

export default App;