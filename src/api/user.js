import axios from 'axios';
import apiUrl from '../apiConfig.js';

//login
export const signIn = (data) => {
  let { email, password } = data
  return axios.post(apiUrl + '/login', {
    credentials: {
      email,
      password
    }
  })
}

//sign out 
export const signOut = (user) => {
  return axios.delete(apiUrl + '/logout', {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
  