import 'react-native-gesture-handler';
import React, { Fragment } from 'react';
import Navigation from './components/Navigation';

import { Provider } from 'react-redux';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
