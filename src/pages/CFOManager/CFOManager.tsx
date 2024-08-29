import CFOCreate from '../../features/createCFO/ui/CFOCreate';
import CFOList from '../../features/cfoList/ui/CFOList';
import styles from './CFOManager.module.css';
import { useAppSelector } from '../../app/store/store';

import { useEffect } from 'react';
import { UserRole } from '../../features/user/model/types/user';
import { useNavigate } from 'react-router-dom';

const CFOManager = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (currentUser?.userRole === UserRole.user) navigate('/');
  }, [currentUser?.userRole, navigate]);

  return (
    <div className={styles.container}>
      <h2 className={styles.headline}>Управление ЦФО</h2>
      {currentUser?.userRole === UserRole.admin && <CFOCreate />}
      <CFOList />
    </div>
  );
};

export default CFOManager;
