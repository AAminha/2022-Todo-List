import React from "react";
import ShowSearchItem from "components/search/ShowSearchItem";
import styles from "components/css/Search.module.css"

function SearchItem({listState, searchItem}) {
  var resultItem = [];
  
  listState.map((state) => {
    var stateValue = JSON.parse(localStorage.getItem(state));
    const data = {
      state : state,
      value : stateValue.filter(item => (
        item.toLowerCase().indexOf(searchItem.toLowerCase()) !== -1
      ))
    }
    resultItem.push(data);
  })

  return(
    <div className={styles.search_result_form}>
      <h3>{`'${searchItem}'에 대한 검색결과`}</h3>
      {(resultItem.filter((item) => item.value.length !== 0)
        .map((item, index) => 
        <ShowSearchItem
          key={index}
          result={item}
        />
      ))}
    </div>
  )
}

export default SearchItem;