/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import './i18n';
import App from './App';
import {name as appName} from './app.json';
import {setCustomText} from 'react-native-global-props';

const customTextProps = {
  style: {
    fontFamily: 'AirbnbCerealLight',
  },
};

setCustomText(customTextProps);

AppRegistry.registerComponent(appName, () => App);
