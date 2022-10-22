const db = require('../database/db.js');

const Jobs = {
    getUsersJobs: (email) => {
        const sql = 'SELECT jobs.id,jobs.job_title,jobs.company_name,jobs.app_stage,jobs.key_date,jobs.set_reminder,jobs.archived,jobs.completed,jobs.deleted,jobs.notes,jobs.last_updated FROM users LEFT JOIN jobs ON users.id = jobs.user_id WHERE email = $1';
        return db.query(sql, [email])
    },
    checkJobExists: (email, job_title, company_name) => {
        const sql = 'SELECT jobs.id FROM users LEFT JOIN jobs ON users.id = jobs.user_id WHERE users.email = $1 AND jobs.job_title = $2 AND jobs.company_name = $3';
        return db.query(sql, [email, job_title, company_name])
    },
    createNewJob: (user_id, job_title, company_name, app_stage, key_date, set_reminder, notes) => {
        const sql = "INSERT INTO jobs(user_id,job_title,company_name,app_stage,key_date,set_reminder,archived,completed,deleted,notes) VALUES($1,$2,$3,$4,$5,$6,'f','f','f',$7)";
        return db.query(sql, [user_id, job_title, company_name, app_stage, key_date, set_reminder, notes])
    },
    updateJobNotes: (job_id, notes) => {
        const sql = 'UPDATE jobs SET notes = $1 WHERE id = $2';
        return db.query(sql, [notes, job_id])
    },
    updateJobReminderStatus: (job_id, newStatus) => {
        const sql = 'UPDATE jobs SET set_reminder = $1 WHERE id = $2';
        return db.query(sql, [newStatus, job_id])
    },
    updateJobArchiveStatus: (job_id, newStatus) => {
        const sql = 'UPDATE jobs SET archived = $1 WHERE id = $2';
        return db.query(sql, [newStatus, job_id])
    },
    updateJobCompletionStatus: (job_id, newStatus) => {
        const sql = 'UPDATE jobs SET completed = $1 WHERE id = $2';
        return db.query(sql, [newStatus, job_id])
    },
    updateJobDeleteStatus: (job_id, newStatus) => {
        const sql = 'UPDATE jobs SET deleted = $1 WHERE id = $2';
        return db.query(sql, [newStatus, job_id])
    }
};

module.exports = Jobs;