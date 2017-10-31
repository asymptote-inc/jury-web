import ApiManager from './apiManager';

async function getNextQuestion() {
  if (!ApiManager.apiManager) {
    return null;
  }

  let questionStr = localStorage.getItem('questions');
  let questions;

  if (!questionStr || questionStr.length <= 0) {
    // First time
    const questionsArray = await ApiManager.apiManager.getUserUnansweredQuestions();
    questions = questionsArray.reduce(
      (prv, q) => ({ ...prv, [q.question_id]: q }),
      {}
    );

    localStorage.setItem('questions', JSON.stringify(questions));
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

        localStorage.setItem('questions', JSON.stringify(toSave));
      })
      .catch(err => {});
  }

  return questions[Object.keys(questions)[0]];
}

async function answer(questionId, answer) {
  const questions = JSON.parse(localStorage.getItem('questions'));
  const questionsNext = Object.keys(questions)
    .filter(q => q !== questionId)
    .reduce((prv, cur) => ({ ...prv, [cur]: questions[cur] }), {});
  localStorage.setItem('questions', JSON.stringify(questionsNext));

  let notSentStr = localStorage.getItem('notSent');
  let notSent = {};
  if (notSentStr) {
    notSent = JSON.parse(notSentStr);
  }
  if (Object.keys(notSent) > 0) {
    Object.keys(notSent).forEach(qid => {
      ApiManager.apiManager
        .postUserAnswer(qid, notSent[qid])
        .then(() => {
          // This might introduce a race condition though
          const notSentNext = Object.keys(notSent)
            .filter(q => q !== qid)
            .reduce((prv, cur) => ({ ...prv, [cur]: notSent[cur] }), {});
          localStorage.setItem('notSent', JSON.stringify(notSentNext));
        })
        .catch(() => {});
    });
  }

  try {
    return await ApiManager.apiManager.postUserAnswer(questionId, answer);
  } catch (error) {
    notSent[questionId] = answer;
    localStorage.setItem('notSent', JSON.stringify(notSent));
  }
}

export { getNextQuestion, answer };
