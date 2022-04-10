import React from "react";
import axios from "axios";
import styles from "components/css/App.module.css"
import Search from "components/search/Search";
import SearchItem from "components/search/SearchItem";
import Form from "components/list/Form";

class App extends React.Component {

  state = {
    input : '',
    listState : [],
    listData : [],  // GET통신을 통해 데이터를 받아와 화면에 반영 (고려할 점 : 이전에 저당된 것도 가져와야하는가.)
    searchInput : ''
  }

  handleSearchChange = (value) => {
    this.setState({ searchInput : value });
  };

  getList = async() => {
    await axios.get("https://my-json-server.typicode.com/jaewoong2/recruiting/0")
    .then(data => {
      data.data.map((current) => {
        localStorage.setItem(current.state, JSON.stringify([current.value]));
      })
    });
  }

  getKey = () => {
    var list=[];
    for(var i = 0; i < localStorage.length; i++) {
      list.push(localStorage.key(i))
    }

    list.filter((item, index) => {
      return list.indexOf(item) === index;
    })

    this.setState({
      listState : list
    });
  }

  componentDidMount() {
    if(localStorage.length === 0) {
      this.getList();
      this.getKey();
    } else {
      this.getKey();
    }
  }

  render() {
    const { searchInput, listState } = this.state;
    const {
      handleSearchChange
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
              <Form key={item} state={item} />
            ))}
          </div>
        }
      </div>
    );
  } 
}

export default App;