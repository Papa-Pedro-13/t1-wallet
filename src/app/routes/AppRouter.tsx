import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../pages/NotFound/NotFound';
import Home from '../../pages/Home/Home';
import Layout from '../layout/Layout';
import Login from '../../pages/Login/Login';
import Registration from '../../pages/Registration/Registration';

import CFOManager from '../../pages/CFOManager/CFOManager';
import CFODetails from '../../pages/CFODetails/CFODetails';
import ProtectedRoute from './ProtectedRoute';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route
        path='/login'
        element={<Login />}
      />
      <Route
        path='/register'
        element={<Registration />}
      />
      {/* <Route element={<ProtectedRoute />}> */}
      <Route
        path='/'
        element={<Layout />}
      >
        <Route
          path='*'
          element={<NotFound />}
        />
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/finance'
          element={<CFOManager />}
        />

        <Route
          path='/finance/:id'
          element={<CFODetails />}
        />
      </Route>
      {/* </Route> */}
    </Routes>
  );
};

export default AppRouter;
