import React, { Component } from 'react';
import { RootStack } from "./navigation";
import { Provider } from 'react-redux';
import store from './store';

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
