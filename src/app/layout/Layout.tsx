import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout: React.FC = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <div className={`${styles.layout} ${darkTheme ? 'dark-mode' : ''}`}>
      <Sidebar
        isOpen={sidebarIsOpen}
        changeOpen={setSidebarIsOpen}
        changeDarkTheme={setDarkTheme}
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
