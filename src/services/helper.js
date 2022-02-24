import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // saving error
        Alert.alert('Oops', 'Gagal Menyimpan')
    }
}

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      // value previously stored
      return value
    }
  } catch(e) {
    // error reading value
    Alert.alert(e)
  }
}
