import React from 'react';
import App from './App';
import '../shared/styles/global.css';
import 'normalize.css';
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');

if (domNode) {
  const root = createRoot(domNode);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
