import React from 'react';
import App from './App';
import '../shared/styles/global.css';
import 'normalize.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';

const domNode = document.getElementById('root');

if (domNode) {
  const root = createRoot(domNode);

  root.render(
    <React.Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.Fragment>
  );
}
