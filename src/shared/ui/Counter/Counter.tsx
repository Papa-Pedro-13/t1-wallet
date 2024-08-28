import styles from './Counter.module.css';
import { FaPlus, FaMinus } from 'react-icons/fa6';

interface CounterProps {
  max: number;
  count: number;
  required?: boolean;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const Counter: React.FC<CounterProps> = ({
  max,
  count,
  setCount,
  required,
}) => {
  const MAX = 99999;

  const increment = () => {
    setCount((prev) => {
      if (prev == max) return max;
      if (prev >= MAX) return MAX;
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
    if (+e.target.value <= -1) {
      setCount(0);
      return;
    }

    if (+e.target.value >= MAX && max > MAX) {
      setCount(MAX);
      return;
    }

    if (+e.target.value >= max + 1) {
      setCount(max);
      return;
    }
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
        required={required}
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
