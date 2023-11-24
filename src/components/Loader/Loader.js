import React from 'react'
import styles from './Loader.module.css'
import Spinner from './Spinner';

function Loader() {
    return (
        <div className={styles.spinnerFullpage}>
          <Spinner />
        </div>
      );
}

export default Loader