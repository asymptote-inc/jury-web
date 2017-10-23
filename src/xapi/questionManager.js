import ApiManager from './apiManager';

async function getNextQuestion() {
  if (!ApiManager.apiManager) {
    return null;
  }

  let questionsString = sessionStorage.getItem('questions');
  let questions = [];
  if (questionsString && questionsString.length > 0) {
    questions = JSON.parse(questionsString);
  }
  if (!questions || questions.length <= 0) {
    questions = await ApiManager.apiManager.getUserUnansweredQuestions();
  }

  const question = questions.shift();
  sessionStorage.setItem('questions', JSON.stringify(questions));

  return question;
}

export default getNextQuestion;
