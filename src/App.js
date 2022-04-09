import React from "react";
import axios from "axios";
import styles from "./App.module.css"
import Search from "components/Search";
import SearchItem from "components/SearchItem";
import Form from "components/Form";

class App extends React.Component {

  state = {
    input : '',
    listState : [],
    listData : [],  // GET통신을 통해 데이터를 받아와 화면에 반영 (고려할 점 : 이전에 저당된 것도 가져와야하는가.)
    initialData : [],
    searchInput : ''
  }

  handleCreate = (state, stateId) => {
    //var today = new Date();
    const { input, listData } = this.state;
    var tempListData = listData;
    tempListData[stateId].value.push(input)
    this.setState({
      input : '',
      listData : tempListData
    })

    localStorage.setItem(state, JSON.stringify(
      tempListData[stateId].value
    ))
  }

  handleModify = (mainId, subId) => {
    console.log("여기는 handleModify");
    const { input, listData } = this.state;
    var tempListData = listData;

    // 해당 id가 있는 배열 index 찾기
    tempListData[mainId].value[subId]=input;

    this.setState({
      listData : tempListData,
      input:''
    })

    console.log(tempListData)

    localStorage.setItem('list', JSON.stringify(tempListData))
  }

  updateData = () => {
    var list = [];
    const { listState } = this.state;
    listState.map((item) => {
      const data = {
        state : item,
        value : localStorage.getItem(item)
      }
      {console.log("현재 state : " + item)}
      {console.log("localStorage에서 가져온 데이터")}
      {console.log(localStorage.getItem(item))}
      list.push(data);
    })
    this.setState({
      listData : list
    })
  }

  handleRemove = (mainId, subId) => {
    const { listData } = this.state;
    var tempListData = listData;
  
    tempListData[mainId].value.splice(subId, 1);

    this.setState({
      listData : tempListData
    });
  }

  handleChange = (value) => {
    this.setState({ input : value });
    {console.log("App에 있는 handleChange 실행 중")}
  }

  handleSearchChange = (value) => {
    this.setState({ searchInput : value });
  };

  getList = async() => {
    //var today = new Date();
    var list =[];
    var state = [];
    await axios.get("https://my-json-server.typicode.com/jaewoong2/recruiting/0")
    .then(data => {
      data.data.map((current) => {
        var test=[];
        test.push(current.value)
        const data = {
          state : current.state,
          value : test
        }
        list.push(data);
        state.push(current.state);
        localStorage.setItem(current.state, JSON.stringify([current.value]));
      })
    });

    // state의 중복을 제거하는 함수
    state.filter((item, index) => {
      return state.indexOf(item) === index;
    })

    this.setState({
      listState : state
    });

  }

  componentDidMount() {
    this.getList();
  }

  render() {
    const { searchInput, listState } = this.state;
    const {
      handleSearchChange,
      handleCreate,
      handleRemove,
      handleModify,
      handleChange
    } = this;

    return (
      <div className={styles.main_form}>
        <div className={styles.header}>
          <h2 className={styles.main_title}>유어슈 사전과제 Todo List 구현</h2>
          <Search
            onSearchChange={handleSearchChange}
          />
        </div>
        {searchInput ?
          <SearchItem
            listState={listState}
            searchItem={searchInput}
          /> :
          <div className={styles.state_main_form}>
            {listState.map((item) => (
              <Form
                key={item}
                state={item}
                onRemove={handleRemove}
                onCreate={handleCreate}
                onChange={handleChange}
                onModify={handleModify}
              />
            ))}
          </div>
        }
      </div>
    );
  } 
}

export default App;