import { useState } from 'react';
import { Button } from '../../../shared/ui';
import Input from '../../../shared/ui/Input/Input';
import styles from './TransferForm.module.css';
import Counter from '../../../shared/ui/Counter/Counter';

interface TransferFormProps {
  from: string;
}
const TransferForm: React.FC<TransferFormProps> = ({ from }) => {
  const initForm = {
    from: from,
    count: 0,
    reason: '',
    recipient: '',
  };
  const [form, setForm] = useState(initForm);
  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandle = () => {};
  return (
    <div className={styles.container}>
      <h3 className={styles.headline}>Перевести коины:</h3>
      <form className={styles.form}>
        <div className={styles.inputBlock}>
          <Input
            placeholder='Получатель'
            name='recipient'
            value={form.recipient}
            onChange={onChangeHandle}
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
        <Counter />
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
