const pool = require('../database/connection');

module.exports = {
    async getExplanationById(req, res) {
        const response = await pool.query("SELECT * FROM explanations WHERE question_id = $1", [
            req.params.id
        ]);
        res.status(200).json({response: response.rows});
    },

    async getAllExplanations(req, res) {
        const response = await pool.query("SELECT * FROM explanations");
        res.status(200).json({response: response.rows});
    },

    async createExplanation(req, res) {
        const response = await pool.query("INSERT INTO explanations (text, question_id) VALUES ($1, $2) RETURNING id", [
            req.body.text,
            req.body.question_id
        ]);
        res.status(200).json({response: response.rows[0].id});
    } 
};