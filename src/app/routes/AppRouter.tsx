import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../pages/NotFound/NotFound';
import Home from '../../pages/Home/Home';
import Layout from '../layout/Layout';
import Login from '../../pages/Login/Login';
import Registration from '../../pages/Registration/Registration';

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
      </Route>
      {/* Добавьте другие маршруты здесь */}
    </Routes>
  );
};

export default AppRouter;
