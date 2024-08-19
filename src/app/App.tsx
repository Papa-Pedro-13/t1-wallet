import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <Router>
      <AppRouter />
      <Toaster position='top-center' />
    </Router>
  );
};

export default App;
