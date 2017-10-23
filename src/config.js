const API_BASE_URL = // 'https://jury.herokuapp.com';
  process.env.NODE_ENV === 'production'
    ? 'https://jury.herokuapp.com'
    : 'http://localhost:5000';

export { API_BASE_URL };
