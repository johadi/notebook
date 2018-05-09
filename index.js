import { AppRegistry, YellowBox } from 'react-native';
import App from './src/App';
import './ReactotronConfig'

console.ignoredYellowBox = ['Remote debugger'];
YellowBox.ignoreWarnings(['Sending `onAnimatedValueUpdate`', 'Module RCTLog']);
// YellowBox.ignoreWarnings(['Warning: Can\'t call setState (or forceUpdate)', 'Module RCTView']);
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
AppRegistry.registerComponent('notebook', () => App);
