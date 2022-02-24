import React from 'react';
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

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient()
const App = () => {

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
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>

  );
};

export default App;
