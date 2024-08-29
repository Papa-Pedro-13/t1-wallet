import { useState } from 'react';
import styles from './TransferForm.module.css';

import { Button, Counter, Dropdown, Input } from '../../../shared/ui';

import { useAppSelector } from '../../../app/store/store';
import { TransferFromCFO } from '../model/types';

interface TransferFormProps {
  form: TransferFromCFO;
  setForm: React.Dispatch<React.SetStateAction<TransferFromCFO>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  headline?: string;
  max?: number;
}
const TransferForm: React.FC<TransferFormProps> = ({
  headline = 'Перевести коины',
  form,
  onSubmit,
  setForm,
  max = 99999,
}) => {
  const [dropdownReload, setDropdownReload] = useState(false);

  const { usersList } = useAppSelector((state) => state.user);

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    setDropdownReload(!dropdownReload);
    onSubmit(e);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.headline}>{headline}</h3>
      <form
        className={styles.form}
        onSubmit={onSubmitHandle}
      >
        <div className={styles.inputBlock}>
          {/* <Input
            placeholder='Получатель'
            name='recipient'
            value={form.recipient}
            onChange={onChangeHandle}
          /> */}
          <Dropdown
            onSelect={(selectedOption) => {
              setForm({ ...form, userId: selectedOption.id });
            }}
            required
            reload={dropdownReload}
            placeholder='Получатель'
            options={usersList}
          />
        </div>
        <div className={styles.inputBlock}>
          <Input
            placeholder='Причина перевода'
            name='comment'
            value={form.comment}
            required
            onChange={onChangeHandle}
          />
        </div>
        <Counter
          max={max}
          // setCount={(value) => setForm({ ...form, amount: value })}
          onChange={(value) => setForm({ ...form, amount: value })}
          count={form.amount}
          required
        />
        <Button
          text='Перевести'
          size='small'
          type='submit'
          // onClick={onSubmitHandle}
        />
      </form>
    </div>
  );
};

export default TransferForm;
