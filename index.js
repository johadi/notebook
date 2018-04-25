import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App';

console.ignoredYellowBox = ['Remote debugger'];
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
AppRegistry.registerComponent('notebook', () => App);
