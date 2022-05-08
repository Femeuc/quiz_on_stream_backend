const pool = require('../../database/connection');

module.exports = {
    async get_all_words(req, res) {
        const response = await pool.query("SELECT * FROM words_list");
        res.status(200).json({response: response.rows});
    }, 

    async send(req, res) {
        const response = await pool.query("INSERT INTO words_list (words_list, author) VALUES ($1, $2) RETURNING id", [
            req.body.words_list,
            req.body.author
        ]);
        res.status(200).json({response: response.rows[0].id});
    } 
};