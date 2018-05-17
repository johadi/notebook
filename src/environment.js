import axios from 'axios';
import { AsyncStorage, Platform } from 'react-native';

export const setAuthorizationHeader = async () => {
  const token = await AsyncStorage.getItem('token');

  if(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return true;
  }

  return false;
};

const appUrls = __DEV__? Platform.select({
  ios: {
    apiUrl: 'http://localhost:8000/api',
    baseUrl: 'http://localhost:8000'
  },
  android: {
    apiUrl: 'http://10.0.2.2:8000/api',
    baseUrl: 'http://10.0.2.2:8000'
  }
}) :
  {
    apiUrl: 'https://jim-notebook-server.herokuapp.com/api',
    baseUrl: 'https://jim-notebook-server.herokuapp.com'
  };

export default appUrls;
