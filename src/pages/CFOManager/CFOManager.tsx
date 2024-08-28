import CFOCreate from '../../features/createCFO/ui/CFOCreate';
import CFOList from '../../features/cfoList/ui/CFOList';
import styles from './CFOManager.module.css';
import { useAppDispatch, useAppSelector } from '../../app/store/store';
import { getCFOList } from '../../features/cfoList/model/cfoSlice';
import { useEffect } from 'react';
import { UserRole } from '../../features/user/userSlice';

const CFOManager = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCFOList());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h2 className={styles.headline}>Управление ЦФО</h2>
      {currentUser?.userRole === UserRole.admin && <CFOCreate />}
      <CFOList />
    </div>
  );
};

export default CFOManager;
