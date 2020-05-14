import 'react-native-gesture-handler';
import React, { Fragment } from 'react';
import Navigation from './components/Navigation';

import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import store from './store';
import theme from './theme';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
    </Provider>
  );
}
