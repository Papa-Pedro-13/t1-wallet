import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

import { FaRubleSign, FaHome, FaCoins, FaRegChartBar } from 'react-icons/fa';
import { Button } from '../../shared/ui';
import { useAppDispatch, useAppSelector } from '../store/store';
import { logoutUser } from '../../features/user/model/userSlice';
import { UserRole } from '../../features/user/model/types/user';

interface SidebarProps {
  isOpen: boolean;
  changeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserRoleTranslations: { [key in UserRole]: string } = {
  [UserRole.admin]: 'Администратор',
  [UserRole.user]: 'Пользователь',
  [UserRole.budgetOwner]: 'Ответственный за бюджеты',
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, changeOpen }) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);

  const onClickHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <nav
      className={styles.sidebar}
      style={{ transform: `${isOpen ? 'none' : 'translateX(-101%)'}` }}
    >
      <div
        className={`${styles.close} ${isOpen ? styles.openClose : ''}`}
        onClick={() => changeOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link
            to='/'
            className={styles.link}
          >
            <FaHome size={24} />
            Главная
          </Link>
        </li>
        {currentUser?.userRole !== UserRole.user && (
          <li className={styles.item}>
            <Link
              to='/finance'
              className={styles.link}
            >
              <FaRubleSign size={24} />
              Центры финансового обеспечения
            </Link>
          </li>
        )}
        {currentUser?.userRole === UserRole.admin && (
          <li className={styles.item}>
            <Link
              to='/dashboard'
              className={styles.link}
            >
              <FaRegChartBar size={24} />
              Анализ денежных потоков
            </Link>
          </li>
        )}
      </ul>
      {currentUser ? (
        <div className={styles.user}>
          <div className={styles.userTop}>
            <h3 className={styles.name}>
              {currentUser.firstname + ' ' + currentUser.lastname}{' '}
            </h3>
            <h3 className={styles.budget}>
              {currentUser.coins}
              <FaCoins size={16} />
            </h3>
          </div>
          <p className={styles.role}>
            {UserRoleTranslations[currentUser.userRole]}
          </p>
          <Button
            size='small'
            text='Сменить аккаунт'
            style='reverse'
            onClick={onClickHandler}
          />
        </div>
      ) : (
        <div className={styles.loading}>Идет загрузка...</div>
      )}
    </nav>
  );
};

export default Sidebar;
