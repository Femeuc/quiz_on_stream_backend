const pool = require('../../database/connection');

module.exports = {
    async send_question(req, res) {
        const response = await pool.query("INSERT INTO either (option_1, option_2, author) VALUES ($1, $2, $3) RETURNING id", [
            req.body.option_1,
            req.body.option_2, 
            req.body.author
        ]);
        res.status(200).json({response: response.rows[0].id});
    } 
};