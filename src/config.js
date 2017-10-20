const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://jury.herokuapp.com'
    : 'http://localhost:8000';

export { API_BASE_URL };
