const { Router } = require('express');
const routes = Router();

const QuestionsController = require('./controllers/QuestionsController');
const QuestionSubjectsController = require('./controllers/QuestionSubjectsController');

routes.get('/questions', QuestionsController.getAllQuestions);
routes.get('/question/:id', QuestionsController.getQuestionById);
routes.get('/questions/filters', QuestionsController.getQuestionsByFilters);

routes.get('/questions/subjects/channel', QuestionSubjectsController.getGeneralAndChannelSubjects);

routes.post('/question', QuestionsController.createQuestion);

routes.post('/questions/subject', QuestionSubjectsController.createChannelSubject);

module.exports = routes;