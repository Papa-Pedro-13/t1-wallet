import { TransferForm } from '../../features/moneyTransfer';
import styles from './Home.module.css';
const Home = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.headline}>Главная</h2>
      <TransferForm
        from={'userName'}
        headline='Перевести собственные коины'
        max={20000}
      />
    </div>
  );
};

export default Home;
