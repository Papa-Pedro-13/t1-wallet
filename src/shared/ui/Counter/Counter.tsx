import styles from './Counter.module.css';
import { FaPlus, FaMinus } from 'react-icons/fa6';

interface CounterProps {
  max: number;
  count: number;
  required?: boolean;
  onChange: (value: number) => void;
  color?: 'red' | 'green' | 'black';
}

const Counter: React.FC<CounterProps> = ({
  max,
  count,
  onChange,
  color = 'black',
  required,
}) => {
  const MAX = 99999;

  const increment = () => {
    if (count == max) {
      onChange(max);
      return;
    }
    if (count >= MAX) {
      onChange(MAX);
      return;
    }
    onChange(count + 1);
  };
  const decrement = () => {
    if (count == 0) {
      onChange(0);
      return;
    }
    return onChange(count - 1);
  };
  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value <= -1) {
      onChange(0);
      return;
    }

    if (+e.target.value >= MAX && max > MAX) {
      onChange(MAX);
      return;
    }

    if (+e.target.value >= max + 1) {
      onChange(max);
      return;
    }
    onChange(+e.target.value);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.sign}
        onClick={decrement}
      >
        <FaMinus
          color='var(--background-color-4)'
          size={18}
        />
      </div>
      <input
        value={count}
        style={{ color: color }}
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
          color='var(--background-color-4)'
          size={18}
        />
      </div>
    </div>
  );
};

export default Counter;
