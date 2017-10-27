import ApiManager from './apiManager';
import removeDuplicatesBy from './util/removeDuplicatesBy';

async function getNextQuestion() {
  if (!ApiManager.apiManager) {
    return null;
  }

  let questionsString = sessionStorage.getItem('questions');
  let questions = [];
  if (questionsString && questionsString.length > 0) {
    questions = JSON.parse(questionsString);
  }
  // This will happen only at the beginning of the session,
  // or if somehow no questions could be fetched until all are gone
  if (!questions || questions.length <= 0) {
    questions = await ApiManager.apiManager.getUserUnansweredQuestions();
  }

  const question = questions.shift();
  sessionStorage.setItem('questions', JSON.stringify(questions));
  // Preload if one or nothing left
  // This happens in background and reduces loading time
  if (questions.length <= 1) {
    ApiManager.apiManager
      .getUserUnansweredQuestions()
      .then(preloadedQuestions => {
        // There can be duplicates since user haven't still sent
        // answers to some questions.
        // But the advantage is, we have some more questions
        // to keep the user busy.
        const cleanedQuestions = removeDuplicatesBy(
          questions.concat(preloadedQuestions),
          q => q.question_id
        );
        sessionStorage.setItem('questions', JSON.stringify(cleanedQuestions));
      })
      .catch(error => {});
  }

  return question;
}

export default getNextQuestion;
