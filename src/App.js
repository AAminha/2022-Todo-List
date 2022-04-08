import React from "react";
import axios from "axios";
import styles from "components/Common.module.css"
import "./App.css"
import DragAndDrop from "DragAndDrop";
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

    localStorage.setItem('list', JSON.stringify(
      listData.concat({
        value : input,
        state : state,
        id : today.toLocaleString()
      })
    ))
  }

  handleModify = (id) => {
    console.log("여기는 handleModify");
    const { input, listData } = this.state;
    var tempListData = listData;

    // 해당 id가 있는 배열 index 찾기
    const index = listData.findIndex((element) => element.id === id);
    tempListData[index].value=input;

    this.setState({
      listData : tempListData,
      input:''
    })

    console.log(tempListData)

    localStorage.setItem('list', JSON.stringify(tempListData))
  }

  handleModifyChange = (id) => {
    const { input, listData } = this.state;
    this.setState({
      input : '',
      listData : listData.map((element) => {
        if(element.id === id) {
          return ({
            value : input,
            state : element.state,
            id : id
          })
        } else {
          return (element)
        }
      })
    })
  }

  handleRemove = (id) => {
    const { listData } = this.state;
    this.setState({
      listData : listData.filter(item => item.id !== id)
    });
  }

  handleChange = (value) => {
    this.setState({ input : value });
    {console.log("App에 있는 handleChange 실행 중")}
  }

  handleSearchChange = (value) => {
    this.setState({ searchInput : value });
  };

  translate = (state) => {
    var kor;
    switch(state) {
      case "done" : kor = "완료"; break;
      case "ready" : kor = "시작 전"; break;
      case "ongoing" : kor = "진행 중"; break;
      case "none" : kor = "상태 없음"; break;
      default: break;
    }
    return kor;
  }

  getList = async() => {
    var today = new Date();
    var list =[];
    var state = [];
    await axios.get("https://my-json-server.typicode.com/jaewoong2/recruiting/0")
    .then(data => {
      data.data.map((current, index) => {
        const data = {
          value : current.value,
          state : current.state,
          id : today.toLocaleString()+index
        }
        const transState = this.translate(current.state);
        list.push(data);
        state.push({state : current.state, kor : transState});
      })
    });
    this.setState({listData : list})
    localStorage.setItem('list', JSON.stringify(list));
    this.setState({listState : state});
  }

  componentDidMount() {
    this.getList();
  }

  render() {
    const { listData, searchInput, listState } = this.state;
    const {
      handleSearchChange,
      handleCreate,
      handleRemove,
      handleModify,
      handleChange
    } = this;
    
    return (
      <div className={styles.main_form}>
        <Search
          onSearchChange={handleSearchChange}
        />
        {searchInput ?
          <SearchItem
            listData={listData}
            searchItem={searchInput}
          /> :
          <div className={styles.list_main_form}>
            {listState.map((element) => (
              <Form
                key={element.state}
                listData={listData}
                onRemove={handleRemove}
                onCreate={handleCreate}
                onChange={handleChange}
                onModify={handleModify}
                state={element.state}
                kor={element.kor}
              />
            ))}
          </div>
        }
      </div>
    );
  } 
}

export default App;