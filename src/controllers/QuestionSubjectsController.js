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
    
    async createSubject(req, res) {
        const response = await pool.query("INSERT INTO question_subjects (subject, subject_simplified, is_general_subject, channel) VALUES ($1, $2, $3, $4) RETURNING id", [
            req.body.subject,
            req.body.subject_simplified.toLowerCase(),
            req.body.is_general_subject,
            req.body.channel
        ]);
        res.status(200).json({response: response.rows[0].id});
    },

    async deleteQuestionSubject(req, res) {
        await pool.query("DELETE FROM question_subjects WHERE id = $1", [
            req.params.id
        ]);
        res.status(200).json();;
    }
};  