import React, { Component } from 'react';
import { RootStack } from "./src/navigation/index";
import { Provider } from 'react-redux';
import store from './src/store/index';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <RootStack/>
      </Provider>
    );
  }
}
