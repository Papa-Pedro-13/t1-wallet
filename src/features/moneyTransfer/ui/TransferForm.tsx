import { useState } from 'react';
import { Button } from '../../../shared/ui';
import Input from '../../../shared/ui/Input/Input';
import styles from './TransferForm.module.css';
import Counter from '../../../shared/ui/Counter/Counter';
import Dropdown from '../../../shared/ui/Dropdown/Dropdown';

interface TransferFormProps {
  from: string;
  headline?: string;
  max: number;
}
const TransferForm: React.FC<TransferFormProps> = ({
  from,
  headline = 'Перевести коины',
  max,
}) => {
  const initForm = {
    from: from,
    count: 0,
    reason: '',
    recipient: '',
  };
  const [count, setCount] = useState(0);
  const [form, setForm] = useState(initForm);
  const [dropdownReload, setDropdownReload] = useState(false);

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandle = () => {
    setDropdownReload(!dropdownReload);
  };
  return (
    <div className={styles.container}>
      <h3 className={styles.headline}>{headline}</h3>
      <form className={styles.form}>
        <div className={styles.inputBlock}>
          {/* <Input
            placeholder='Получатель'
            name='recipient'
            value={form.recipient}
            onChange={onChangeHandle}
          /> */}
          <Dropdown
            onSelect={(selectedOption) => {
              setForm({ ...form, recipient: selectedOption });
            }}
            reload={dropdownReload}
            placeholder='Получатель'
            options={['Вася', 'Коля', 'Маша', 'Петя']}
          />
        </div>
        <div className={styles.inputBlock}>
          <Input
            placeholder='Причина перевода'
            name='reason'
            value={form.reason}
            onChange={onChangeHandle}
          />
        </div>
        <Counter
          max={max}
          setCount={setCount}
          count={count}
        />
        <Button
          text='Перевести'
          size='small'
          type='submit'
          onClick={onSubmitHandle}
        />
      </form>
    </div>
  );
};

export default TransferForm;
