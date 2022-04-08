import React from "react";
import ShowSearchItem from "./ShowSearchItem";

function SearchItem({listData, searchItem}) {
  const resItem = listData.filter((element) => 
    element.value.toLowerCase().indexOf(searchItem.toLowerCase()) !== -1
  )

  return(
    <div>
      <h3>{`'${searchItem}'에 대한 검색결과`}</h3>
      {resItem.map((tt) => (
        <ShowSearchItem item={tt}/>
      ))}
    </div>
  )
}

export default SearchItem;