const pool = require('../database/connection');

module.exports = {
    async getAllExplanations(req, res) {
        const response = await pool.query("SELECT * FROM explanations_suggestions");
        res.status(200).json({response: response.rows});
    },

    async createExplanation(req, res) {
        const response = await pool.query("INSERT INTO explanations_suggestions (text, question_id) VALUES ($1, $2) RETURNING id", [
            req.body.text,
            req.body.question_id
        ]);
        res.status(200).json({response: response.rows[0].id});
    }, 

    async deleteExplanation(req, res) { 
        await pool.query("DELETE FROM explanations_suggestions WHERE id = $1", [
            req.params.id
        ]);
        res.status(200).json();
    }
};