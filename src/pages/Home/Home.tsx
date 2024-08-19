import { TransferForm } from '../../features/moneyTransfer';
import styles from './Home.module.css';
const Home = () => {
  return (
    <div className={styles.container}>
      <TransferForm from={'userName'} />
    </div>
  );
};

export default Home;
