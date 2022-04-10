import React from "react";
import styles from "components/css/Search.module.css";

function ShowSearchItem({result}) {
  return (
    <div className={styles.result_item}>
      <div className={styles.result_item_state}>{result.state}</div>
      <div>
        {result.value.map(item => {
          return(
          <div key={item} className={styles.result_item_value}>
            {item}
          </div>)
        })}
      </div>
    </div>
  )
}

export default ShowSearchItem;