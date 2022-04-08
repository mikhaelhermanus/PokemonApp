/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(remoteMessage => {
    console.log(remoteMessage, 'remote message from background')
})
AppRegistry.registerComponent(appName, () => App);
