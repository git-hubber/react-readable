import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './App.css';
import configureStore from './store/configureStore';
import { AppRouter } from './routes/AppRouter';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
