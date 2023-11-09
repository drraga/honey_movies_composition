import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://kinopoiskapiunofficial.tech/api/',
  headers: {
    'X-API-KEY': import.meta.env.VITE_KINOPOISK_API_KEY,
    'Content-Type': 'application/json',
  },
});

export default axiosClient
