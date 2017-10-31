import { API_BASE_URL } from '../config';

class ApiManager {
  static _apiManager = null;

  static get apiManager() {
    if (ApiManager._apiManager) {
      return ApiManager._apiManager;
    } else {
      const token = localStorage.getItem('token');
      if (token) {
        ApiManager._apiManager = new ApiManager(token);
        return ApiManager._apiManager;
      } else {
        return null;
      }
    }
  }

  static async register(options) {
    if (!options.username || !options.email) {
      throw new Error('Both the username and the email must be provided. ');
    } else if (!options.password) {
      throw new Error('Password must be provided. ');
    } else {
      try {
        const optionsReturn = await (await fetch(`${API_BASE_URL}/register`, {
          method: 'POST',
          body: JSON.stringify(options),
          headers: {
            'Content-Type': 'application/json'
          }
        })).json();
        return options.username === optionsReturn.username;
      } catch (error) {
        return null;
      }
    }
  }

  static async createApiManager(options, save) {
    localStorage.removeItem('token');

    if (!options.username && !options.email) {
      throw new Error('Either the username or the email must be provided. ');
    } else if (!options.password) {
      throw new Error('Password must be provided. ');
    } else {
      try {
        const { code } = await (await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          body: JSON.stringify(options),
          headers: {
            'Content-Type': 'application/json'
          }
        })).json();
        if (!code) {
          console.log('Login failed. ');
          return null;
        }
        ApiManager._apiManager = new ApiManager(code);
        if (save) {
          localStorage.setItem('token', code);
        }
        return ApiManager._apiManager;
      } catch (error) {
        return null;
      }
    }
  }

  static async logout() {
    const token = localStorage.getItem('token');
    if (!ApiManager._apiManager || !token) {
      return Promise.resolve({ status: 'OK' });
    }

    const headers = { Authorization: `Bearer ${token}` };

    ApiManager._apiManager = null;
    localStorage.removeItem('token');
    localStorage.removeItem('questions');
    localStorage.removeItem('notSent');

    return (await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' }
    })).json();
  }

  constructor(token) {
    const headers = { Authorization: `Bearer ${token}` };

    this.getScoreboard = async () =>
      await (await fetch(`${API_BASE_URL}/xapi/scoreboard`, {
        method: 'GET',
        headers
      })).json();

    this.getUserData = async () =>
      await (await fetch(`${API_BASE_URL}/xapi/user_data`, {
        method: 'GET',
        headers
      })).json();

    this.postUserAnswer = async (questionId, body) =>
      await (await fetch(`${API_BASE_URL}/xapi/user_answer/${questionId}`, {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body
      })).json();

    this.getUserUnansweredQuestions = async () =>
      await (await fetch(`${API_BASE_URL}/xapi/user_unanswered_questions`, {
        method: 'GET',
        headers
      })).json();
  }
}

export default ApiManager;
