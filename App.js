import React, { useEffect } from 'react';
import {
  SafeAreaView,
  Text,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PokemonList from './src/pokemonList/PokemonList';
import PokemonDetail from './src/pokemonDetail/PokemonDetail'
import PokeBag from './src/pokeBag/pokeBag'
import { QueryClient, QueryClientProvider } from 'react-query'
import messaging from '@react-native-firebase/messaging';
import Map  from './src/component/Map';
import CameraScan from './src/component/CameraScan'

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient()


const App = () => {

  const onSetupCloudMessaging = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken()
    console.log(token)
  }

  const onNotificationOpen = () => {
    //it wil trigger when notification open
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });
    //it will trigger when app was in quit mode
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });

    messaging().onMessage(remoteMessage =>{
      console.log(remoteMessage, 'on message')
    })
  }

  useEffect(() => {
    onSetupCloudMessaging()
    getToken()
    onNotificationOpen()
  }, [])


  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="PokemonList" component={PokemonList} />
          <Stack.Screen name="PokemonDetail" component={PokemonDetail} />
          <Stack.Screen name="PokeBag" component={PokeBag} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name='CameraScan' component={CameraScan}/>
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>

  );
};

export default App;
