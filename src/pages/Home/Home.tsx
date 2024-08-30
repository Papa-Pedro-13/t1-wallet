import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import { TransferForm } from '../../features/moneyTransfer';
import styles from './Home.module.css';
import { TransferFromCFO } from '../../features/moneyTransfer/model/types';
import { TransferCoinsFromUser } from '../../shared/api/transferApi/transferApi';
import { getUser } from '../../features/user/model/userSlice';
const Home = () => {
  const [form, setForm] = useState<TransferFromCFO>({
    amount: 0,
    userId: 0,
    comment: '',
  });
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <h2 className={styles.headline}>Главная</h2>
      <TransferForm
        form={form}
        setForm={setForm}
        headline='Перевести собственные коины'
        max={currentUser?.coins}
        onSubmit={(e) => {
          TransferCoinsFromUser(e, form).then(() => dispatch(getUser()));
        }}
      />
    </div>
  );
};

export default Home;
