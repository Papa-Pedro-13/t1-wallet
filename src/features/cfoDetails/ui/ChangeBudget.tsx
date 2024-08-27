import { useState } from 'react';
import Counter from '../../../shared/ui/Counter/Counter';
import styles from './ChangeBudget.module.css';
import { Button } from '../../../shared/ui';

const ChangeBudget = () => {
  const [newBudget, setNewBudget] = useState(0);

  const onClickHandle = () => {};
  return (
    <div className={styles.container}>
      <h3 className={styles.headline}>Изменить текущий бюджет</h3>
      {/* Need */}
      <Counter
        max={10000}
        setCount={setNewBudget}
        count={newBudget}
      />
      <Button
        onClick={onClickHandle}
        text='Подтвердить'
        size='small'
      />
    </div>
  );
};

export default ChangeBudget;
