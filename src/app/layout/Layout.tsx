import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout: React.FC = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  return (
    <div className={styles.layout}>
      <Sidebar
        isOpen={sidebarIsOpen}
        changeOpen={setSidebarIsOpen}
      />
      <main
        className={`${styles.main} ${sidebarIsOpen ? '' : styles.mainFull}`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
