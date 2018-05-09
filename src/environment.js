import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const setAuthorizationHeader = async () => {
  const token = await AsyncStorage.getItem('token');

  if(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return true;
  }

  return false;
};

export default {
  apiUrl: 'http:localhost:8000/api'
}
