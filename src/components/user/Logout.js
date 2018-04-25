import React, {Component} from 'react';

export class Logout extends Component {
  componentDidMount(){
    this.props.navigation.navigate('Auth');
  }

  render() {
    return null;
  }
}
