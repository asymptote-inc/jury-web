import ApiManager from './apiManager';

async function getNextQuestion() {
  if (!ApiManager.apiManager) {
    return null;
  }

  let questionStr = sessionStorage.getItem('questions');
  let questions;

  if (!questionStr || questionStr.length <= 0) {
    // First time
    const questionsArray = await ApiManager.apiManager.getUserUnansweredQuestions();
    questions = questionsArray.reduce(
      (prv, q) => ({ ...prv, [q.question_id]: q }),
      {}
    );

    sessionStorage.setItem('questions', JSON.stringify(questions));
  } else {
    questions = JSON.parse(questionStr);
  }

  if (Object.keys(questions).length <= 2) {
    // Prefetch in background
    ApiManager.apiManager
      .getUserUnansweredQuestions()
      .then(questionsArray => {
        const toSave = {
          // Eliminate duplicates
          ...questions,
          ...questionsArray.reduce(
            (prv, q) => ({ ...prv, [q.question_id]: q }),
            {}
          )
        };

        sessionStorage.setItem('questions', JSON.stringify(toSave));
      })
      .catch(err => {});
  }

  return questions[Object.keys(questions)[0]];
}

async function answer(questionId, answer) {
  let questions = JSON.parse(sessionStorage.getItem('questions'));
  questions = Object.keys(questions)
    .filter(q => q !== questionId)
    .reduce((prv, cur) => ({ ...prv, [cur]: questions[cur] }), {});
  sessionStorage.setItem('questions', JSON.stringify(questions));

  return await ApiManager.apiManager.postUserAnswer(questionId, answer);
}

export { getNextQuestion, answer };
