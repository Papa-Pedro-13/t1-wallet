import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';

import { FaRubleSign, FaHome, FaCoins } from 'react-icons/fa';
import { Button } from '../../shared/ui';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate('/login');
  };

  return (
    <nav className={styles.sidebar}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link
            to='/'
            className={styles.link}
          >
            <FaHome />
            Главная
          </Link>
        </li>
        <li className={styles.item}>
          <Link
            to='/budget'
            className={styles.link}
          >
            <FaRubleSign />
            Бюджет
          </Link>
        </li>
      </ul>
      <div className={styles.user}>
        <div className={styles.userTop}>
          <h3 className={styles.name}>Вася</h3>
          <h3 className={styles.budget}>
            1000
            <FaCoins size={16} />
          </h3>
        </div>
        <p className={styles.role}>Администратор</p>
        <Button
          size='small'
          text='Сменить аккаунт'
          style='reverse'
          onClick={onClickHandler}
        />
      </div>
    </nav>
  );
};

export default Sidebar;
