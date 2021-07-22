const pool = require('../database/connection');

module.exports = {
    async getAllQuestions(req, res) {
        const response = await pool.query("SELECT * FROM questions order by id");
        res.status(200).json({response: response.rows});
    },

    async getQuestionById(req, res) {
        const response = await pool.query("SELECT * FROM questions WHERE id = $1", [
            req.params.id
        ]);
        res.status(200).json({response: response.rows});
    },

    async getQuestionsByFilters(req, res) {

        const difficulties = adaptDifficultiesToDatabase(req.query.difficulty);
        const subjects = await adaptSubjectsToDatabase(req.query.subject);
        
        const response = await pool.query("SELECT id FROM questions WHERE subject = ANY ($1) AND difficulty = ANY ($2)", [
            subjects,
            difficulties
        ]);
        res.status(200).json({response: response.rows});
    }, 

    async getQuestionJoinQuestionSubject(req, res) {
        const sql_statement = "SELECT questions.id AS question_id, description, option_a, option_b, option_c, option_d," 
            + " difficulties.name AS difficulty, question_subjects.subject AS subject, author FROM questions INNER JOIN " 
            + "difficulties ON difficulty = difficulties.id INNER JOIN question_subjects ON questions.subject = question_subjects.id WHERE questions.id = $1";

        const response = await pool.query(sql_statement, [
            req.params.id
        ]);
        res.status(200).json({response: response.rows});
        
    }, 

    async createQuestion(req, res) {
        const response = await pool.query("INSERT INTO questions (description, option_a, option_b, option_c, option_d, correct_option, difficulty, subject, author) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id", [
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
    
    async updateQuestion(req, res) {
        await pool.query("UPDATE questions SET description = $1, option_a = $2, option_b = $3, option_c = $4, option_d = $5, correct_option = $6, difficulty = $7, subject = $8, author = $9 WHERE id = $10", [
            req.body.description,
            req.body.option_a,
            req.body.option_b,
            req.body.option_c,
            req.body.option_d,
            req.body.answer,
            req.body.difficulty,
            req.body.subject,
            req.body.author.toLowerCase(),
            req.params.id
        ]);
        res.status(200).json();;
    },

    async deleteQuestion(req, res) {
        await pool.query("DELETE FROM questions WHERE id = $1", [
            req.params.id
        ]);
        res.status(200).json();;
    }
    
};  


function adaptDifficultiesToDatabase(difficulties) {

    let new_difficulty_array = [];
        
    if(typeof(difficulties) == 'object') {
        for(let i = 0; i < difficulties.length; i++){
            switch(difficulties[i]) {
                case 'easy':
                    difficulties[i] = 1;
                    break;
                case 'normal':
                    difficulties[i] = 2;
                    break;
                case 'hard':
                    difficulties[i] = 3;
                    break;
            }
        }
        new_difficulty_array = difficulties;
    } else {
        switch(difficulties) {
            case 'easy':
                difficulties = 1;
                break;
            case 'normal':
                difficulties = 2;
                break;
            case 'hard':
                difficulties = 3;
                break;
        }
        new_difficulty_array.push(difficulties);
    }
    return new_difficulty_array;
}

async function adaptSubjectsToDatabase(subjects) {
    let new_subjects_array = [];
    new_subjects_array.push(subjects);
    
    const response = await pool.query(`SELECT id FROM question_subjects WHERE subject = ANY ($1)`, [
        new_subjects_array
    ]);

    new_subjects_array = response.rows.map(function(value, index) {
        return value.id;
    });
    
    return (new_subjects_array);
}