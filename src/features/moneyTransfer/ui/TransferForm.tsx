import { useState } from 'react';
import styles from './TransferForm.module.css';
import { Button, Counter, Dropdown, Input } from '../../../shared/ui';
import { TransferFromCFO, TransferUserToUser } from '../model/types';
import { User } from '../../user/model/types/user';
import { CFO } from '../../cfoList/model/types';

interface TransferFormProps<T extends TransferFromCFO | TransferUserToUser> {
  form: T;
  setForm: React.Dispatch<React.SetStateAction<T>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  recipientsList: User[] | CFO[];
  headline?: string;
  max?: number;
}
const TransferForm = <T extends TransferFromCFO | TransferUserToUser>({
  headline = 'Перевести коины',
  form,
  onSubmit,
  setForm,
  recipientsList,
  max = 99999,
}: TransferFormProps<T>) => {
  const [dropdownReload, setDropdownReload] = useState(false);

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
          <Dropdown
            onSelect={(selectedOption) => {
              setForm({ ...form, userId: selectedOption.id });
            }}
            required
            reload={dropdownReload}
            placeholder='Получатель'
            options={recipientsList}
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
          onChange={(value) => setForm({ ...form, amount: value })}
          count={form.amount}
          required
        />
        <Button
          text='Перевести'
          size='small'
          type='submit'
        />
      </form>
    </div>
  );
};

export default TransferForm;
