import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';

import { FaRubleSign, FaHome, FaCoins } from 'react-icons/fa';
import { Button } from '../../shared/ui';
interface SidebarProps {
  isOpen: boolean;
  changeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Sidebar: React.FC<SidebarProps> = ({ isOpen, changeOpen }) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate('/login');
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
        <li className={styles.item}>
          <Link
            to='/finance'
            className={styles.link}
          >
            <FaRubleSign size={24} />
            Центры финансового обеспечения
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
