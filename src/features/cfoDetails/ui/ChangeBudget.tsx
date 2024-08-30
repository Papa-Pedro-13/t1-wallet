import { useState } from 'react';

import styles from './ChangeBudget.module.css';
import { Button, Counter, Modal } from '../../../shared/ui';

interface ChangeBudgetProps {
  value: number;
  disabled?: boolean;
  counterColor: 'red' | 'green' | 'black';
  onChange: (value: number) => void;
  onSubmit: () => void;
}

const ChangeBudget: React.FC<ChangeBudgetProps> = ({
  value,
  counterColor,
  onChange,
  disabled,
  onSubmit,
}) => {
  const [isActiveModal, setIsActiveModal] = useState(false);

  const onSubmitHandle = () => {
    onSubmit();
    setIsActiveModal(false);
  };

  const onChangeHandle = (value: number) => {
    onChange(value);
  };

  const onClickHandle = () => {
    setIsActiveModal(true);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.headline}>Изменить текущий бюджет</h3>
      {/* Need */}
      <Counter
        max={99999}
        onChange={onChangeHandle}
        count={value}
        color={counterColor}
      />
      <Button
        disabled={disabled}
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
