const pool = require('../database/connection');

module.exports = {
    async getAllSuggestions(req, res) {
        const response = await pool.query("SELECT * FROM subject_suggestion");
        res.status(200).json({response: response.rows});
    },

    async createSuggestion(req, res) { 
        const response = await pool.query("INSERT INTO subject_suggestion (subject, subject_simplified, is_general_subject, channel) VALUES ($1, $2, $3, $4) RETURNING id", [
            req.body.subject,
            req.body.subject_simplified.toLowerCase(),
            req.body.is_general_subject,
            req.body.channel
        ]);
        res.status(200).json({response: response.rows[0].id});
    }, 

    async deleteSuggestion(req, res) {
        await pool.query("DELETE FROM subject_suggestion WHERE id = $1", [
            req.params.id
        ]);
        res.status(200).json();;
    }
};