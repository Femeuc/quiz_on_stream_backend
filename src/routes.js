const { Router } = require('express');
const routes = Router();

const QuestionsController = require('./controllers/QuestionsController');
const QuestionSubjectsController = require('./controllers/QuestionSubjectsController');
const QuestionReportController = require('./controllers/QuestionReportController');
const QuestionSuggestController = require('./controllers/QuestionSuggestController');
const SubjectSuggestionController = require('./controllers/SubjectSuggestionController');

routes.get('/questions', QuestionsController.getAllQuestions);
routes.get('/question/:id', QuestionsController.getQuestionById);
routes.get('/questions/filters', QuestionsController.getQuestionsByFilters);
routes.get('/question/join/question-subject/:id', QuestionsController.getQuestionJoinQuestionSubject);
routes.post('/question', QuestionsController.createQuestion);
routes.put('/question/:id', QuestionsController.updateQuestion);
routes.delete('/question/:id', QuestionsController.deleteQuestion);

routes.get('/questions/subjects', QuestionSubjectsController.get_all_subjects);
routes.get('/questions/subjects/channel', QuestionSubjectsController.getGeneralAndChannelSubjects);
routes.post('/questions/subject', QuestionSubjectsController.createSubject);
routes.delete('/questions/subject/:id', QuestionSubjectsController.deleteQuestionSubject);

routes.post('/question/report', QuestionReportController.createReport);

routes.post('/question/suggest', QuestionSuggestController.createSuggestion);
routes.post('/questions/subject/suggest', SubjectSuggestionController.createSuggestion);

module.exports = routes;