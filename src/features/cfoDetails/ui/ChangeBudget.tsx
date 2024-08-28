import { useState } from 'react';
import Counter from '../../../shared/ui/Counter/Counter';
import styles from './ChangeBudget.module.css';
import { Button } from '../../../shared/ui';
import Modal from '../../../shared/ui/Modal/Modal';

const ChangeBudget = () => {
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [newBudget, setNewBudget] = useState(0);

  const onSubmitHandle = () => {
    setIsActiveModal(false);
  };

  const onClickHandle = () => {
    setIsActiveModal(true);
  };

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
        text='Изменить'
        size='small'
      />
      {isActiveModal && (
        <Modal
          onCancel={() => setIsActiveModal(false)}
          onAccept={onSubmitHandle}
        >
          <h2 className={styles.modalHeadline}>Вы уверены?</h2>
        </Modal>
      )}
    </div>
  );
};

export default ChangeBudget;
