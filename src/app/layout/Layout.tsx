import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
