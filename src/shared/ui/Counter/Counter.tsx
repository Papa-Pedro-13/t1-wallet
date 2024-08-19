import { useState } from 'react';
import styles from './Counter.module.css';
import { FaPlus, FaMinus } from 'react-icons/fa6';

const Counter = () => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount((prev) => {
      if (prev == 9999) return 9999;
      return prev + 1;
    });
  };
  const decrement = () => {
    setCount((prev) => {
      if (prev == 0) return 0;
      return prev - 1;
    });
  };
  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value <= -1) return 0;
    if (+e.target.value >= 10000) return 9999;
    setCount(+e.target.value);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.sign}
        onClick={decrement}
      >
        <FaMinus
          color='#fbfbfd'
          size={18}
        />
      </div>
      <input
        value={count}
        className={styles.counter}
        type='number'
        onChange={onChangeHandle}
      />

      <div
        className={styles.sign}
        onClick={increment}
      >
        <FaPlus
          color='#fbfbfd'
          size={18}
        />
      </div>
    </div>
  );
};

export default Counter;
