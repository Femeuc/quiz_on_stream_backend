const pool = require('../database/connection');


module.exports = {

    async get_all_subjects(req, res) {
        const response = await pool.query("SELECT * FROM question_subjects");
        res.status(200).json({response: response.rows});
    },

    async getGeneralAndChannelSubjects(req, res) {
        const response = await pool.query("SELECT * FROM question_subjects WHERE is_general_subject = true or channel = $1", [
            req.query.name
        ]);
        res.status(200).json({response: response.rows});
    },
    
    async createChannelSubject(req, res) {
        const response = await pool.query("INSERT INTO question_subjects (subject, subject_simplified, is_general_subject, channel) VALUES ($1, $2, $3, $4) RETURNING id", [
            req.body.subject,
            req.body.subject_simplified.toLowerCase(),
            'false',
            req.body.channel.toLowerCase()
        ]);
        res.status(200).json({response: response.rows[0].id});
    }
};  