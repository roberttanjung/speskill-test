import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://spe-academy.spesolution.net/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer o7Ytbt9XQLI3PgtebJfKSXKEf0XHU74Y`
  }
});

export default instance
