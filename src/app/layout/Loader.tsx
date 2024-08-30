// components/Loader.js

import React from 'react';
import styles from './Loader.module.css'; // Подключаем стили для лоадера

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
