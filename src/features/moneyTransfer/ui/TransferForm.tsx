import { useState } from 'react';
import styles from './TransferForm.module.css';

import { Button } from '../../../shared/ui';
import Input from '../../../shared/ui/Input/Input';
import Counter from '../../../shared/ui/Counter/Counter';
import Dropdown from '../../../shared/ui/Dropdown/Dropdown';

import axios from 'axios';
import toast from 'react-hot-toast';

interface TransferFormProps {
  from: string;
  url: string;
  headline?: string;
  max?: number;
}
const TransferForm: React.FC<TransferFormProps> = ({
  from,
  headline = 'Перевести коины',
  max = 99999,
  url,
}) => {
  const initForm = {
    from: from,
    reason: '',
    recipient: '',
  };
  const [count, setCount] = useState(0);
  const [form, setForm] = useState(initForm);
  const [dropdownReload, setDropdownReload] = useState(false);

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (count === 0) {
      toast.error('Нельзя переводить 0 коинов');
      return;
    }

    try {
      const response = await axios(url, {
        data: {
          ...form,
          count: count,
        },
      });
      console.log(response);
      toast.success('Перевод совершён!');
    } catch {
      toast.error('Перевод не удался!');
    }

    setCount(0);
    setForm(initForm);
    setDropdownReload(!dropdownReload);
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
              setForm({ ...form, recipient: selectedOption });
            }}
            required
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
            required
            onChange={onChangeHandle}
          />
        </div>
        <Counter
          max={max}
          setCount={setCount}
          count={count}
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
