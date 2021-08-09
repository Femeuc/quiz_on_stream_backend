const { Router } = require('express');
const routes = Router();

const QuestionsController = require('./controllers/QuestionsController');
const QuestionExplanationController = require('./controllers/QuestionExplanationController');
const QuestionSubjectsController = require('./controllers/QuestionSubjectsController');
const QuestionReportController = require('./controllers/QuestionReportController');
const QuestionSuggestController = require('./controllers/QuestionSuggestController');
const SubjectSuggestionController = require('./controllers/SubjectSuggestionController');

// Question Controller routes
routes.get('/questions', QuestionsController.getAllQuestions);
routes.get('/question/:id', QuestionsController.getQuestionById);
routes.get('/questions/filters', QuestionsController.getQuestionsByFilters);
routes.get('/question/join/question-subject/:id', QuestionsController.getQuestionJoinQuestionSubject);
routes.post('/question', QuestionsController.createQuestion);
routes.put('/question/:id', QuestionsController.updateQuestion);
routes.delete('/question/:id', QuestionsController.deleteQuestion);

// Question Explanation Controller 
routes.get('/questions/explanations', QuestionExplanationController.getAllExplanations);
routes.post('/question/explanation', QuestionExplanationController.createExplanation);

// Question Subjects Controller routes
routes.get('/questions/subjects', QuestionSubjectsController.get_all_subjects);
routes.get('/questions/subjects/channel', QuestionSubjectsController.getGeneralAndChannelSubjects);
routes.post('/questions/subject', QuestionSubjectsController.createSubject);
routes.delete('/questions/subject/:id', QuestionSubjectsController.deleteQuestionSubject);

// Question Report Controller routes
routes.get('/questions/reports', QuestionReportController.getAllReports);
routes.post('/question/report', QuestionReportController.createReport);

// Question Suggestion Controller routes
routes.get('/questions/suggestions', QuestionSuggestController.getAllSuggestions);
routes.post('/question/suggest', QuestionSuggestController.createSuggestion);

// Subject Suggestion Controller route
routes.get('/questions/subjects/suggestions', SubjectSuggestionController.getAllSuggestions);
routes.post('/questions/subject/suggest', SubjectSuggestionController.createSuggestion);

module.exports = routes;