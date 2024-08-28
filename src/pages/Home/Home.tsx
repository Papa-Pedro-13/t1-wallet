import { BASE_URL } from '../../app/ambient/constants';
import { useAppSelector } from '../../app/store/store';
import { TransferForm } from '../../features/moneyTransfer';
import styles from './Home.module.css';
const Home = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  return (
    <div className={styles.container}>
      <h2 className={styles.headline}>Главная</h2>
      <TransferForm
        url={`${BASE_URL}/user/transfer/${currentUser?.id}`}
        from={'userName'}
        headline='Перевести собственные коины'
        max={currentUser?.coins}
      />
    </div>
  );
};

export default Home;
