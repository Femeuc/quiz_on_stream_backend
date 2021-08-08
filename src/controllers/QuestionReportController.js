const pool = require('../database/connection');

module.exports = {
    async getAllReports(req, res) {
        const response = await pool.query("SELECT * FROM reports");
        res.status(200).json({response: response.rows});
    },

    async createReport(req, res) {
        const response = await pool.query("INSERT INTO reports (question_id, question_description, motive) VALUES ($1, $2, $3) RETURNING id", [
            req.body.question_id,
            req.body.question_description,
            req.body.motive
        ]);
        res.status(200).json({response: response.rows[0].id});
    } 
};