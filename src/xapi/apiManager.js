import { API_BASE_URL } from './config';

class ApiManager {
  static _apiManager = null;

  static get apiManager() {
    if (ApiManager._apiManager) {
      return ApiManager._apiManager;
    } else {
      const token = localStorage.getItem('token');
      if (token) {
        ApiManager._apiManager = new ApiManager(token);
      } else {
        return null;
      }
    }
  }

  static async createApiManager(options, save) {
    localStorage.removeItem('token');

    if (!options.username && !options.email) {
      throw new Error('Either the username or the password must be provided. ');
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
