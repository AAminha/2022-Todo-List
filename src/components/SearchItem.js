import React from "react";
import ShowSearchItem from "./ShowSearchItem";
import styles from "./Search.module.css"

function SearchItem({listState, searchItem}) {
  var resItem = [];
  
  listState.map((state) => {
    var stateValue = JSON.parse(localStorage.getItem(state));
    const data = {
      state : state,
      value : stateValue.filter(item => (
        item.toLowerCase().indexOf(searchItem.toLowerCase()) !== -1
      ))
    }
    resItem.push(data);
  })

  return(
    <div className={styles.search_result_form}>
      <h3>{`'${searchItem}'에 대한 검색결과`}</h3>
      {(resItem.filter((item) => item.value.length !== 0)
        .map((item, index) => 
        <ShowSearchItem
          key={index}
          item={item}
        />
      ))}
    </div>
  )
}

export default SearchItem;