import { useEffect } from 'react';
import { useAppSelector } from '../../app/store/store';
import { CashFlows } from '../../features/dashboard';
import styles from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../features/user/model/types/user';

const Dashboard = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.userRole === UserRole.user) navigate('/');
  }, [currentUser?.userRole, navigate]);

  return (
    <div className={styles.container}>
      <h2 className={styles.headline}>Анализ движения денежных средств</h2>
      <CashFlows />
    </div>
  );
};

export default Dashboard;
