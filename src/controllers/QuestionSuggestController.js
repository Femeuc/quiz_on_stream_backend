const pool = require('../database/connection');

module.exports = {
    async createSuggestion(req, res) { 
        const response = await pool.query("INSERT INTO suggestions (description, option_a, option_b, option_c, option_d, correct_option, difficulty, subject, author) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id", [
            req.body.description,
            req.body.option_a,
            req.body.option_b,
            req.body.option_c,
            req.body.option_d,
            req.body.answer,
            req.body.difficulty,
            req.body.subject,
            req.body.author.toLowerCase()
        ]);
        res.status(200).json({response: response.rows[0].id});
    }, 

    async getAllSuggestions(req, res) {
        const response = await pool.query("SELECT * FROM suggestions");
        res.status(200).json({response: response.rows[0]});
    }
};