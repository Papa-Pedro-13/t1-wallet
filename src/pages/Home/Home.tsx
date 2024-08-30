import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import { TransferForm } from '../../features/moneyTransfer';
import styles from './Home.module.css';
import { TransferUserToUser } from '../../features/moneyTransfer/model/types';
import { TransferCoinsFromUser } from '../../shared/api/transferApi/transferApi';
import { getUser } from '../../features/user/model/userSlice';

const Home = () => {
  const [form, setForm] = useState<TransferUserToUser>({
    amount: 0,
    userId: 0,
    comment: '',
  });
  const { currentUser, usersList } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <h2 className={styles.headline}>Главная</h2>
      <TransferForm<TransferUserToUser>
        form={form}
        setForm={setForm}
        headline='Перевести собственные коины'
        max={currentUser?.coins}
        onSubmit={(e) => {
          TransferCoinsFromUser(e, form).then(() => dispatch(getUser()));
        }}
        recipientsList={usersList.filter((user) => user.id !== currentUser?.id)}
      />
    </div>
  );
};

export default Home;
