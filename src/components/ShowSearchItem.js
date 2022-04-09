import React from "react";
import styles from "./Search.module.css";

function ShowSearchItem({item}) {
  return (
    <div className={styles.result_item}>
      <div className={styles.result_item_state}>{item.state}</div>
      <div>
        {item.value.map(itm => {
          return(<div className={styles.result_item_value}>{itm}</div>)
        })}
      </div>
    </div>
  )
}

export default ShowSearchItem;