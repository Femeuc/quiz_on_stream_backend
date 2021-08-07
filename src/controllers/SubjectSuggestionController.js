const pool = require('../database/connection');

module.exports = {
    async createSuggestion(req, res) { 
        const response = await pool.query("INSERT INTO subject_suggestion (subject, subject_simplified, is_general_subject, channel) VALUES ($1, $2, $3, $4) RETURNING id", [
            req.body.subject,
            req.body.subject_simplified.toLowerCase(),
            req.body.is_general_subject,
            req.body.channel
        ]);
        res.status(200).json({response: response.rows[0].id});
    } 
};