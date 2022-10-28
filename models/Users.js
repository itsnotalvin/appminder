const db = require('../database/db.js');

const User = {
    checkUserDetailsWithEmail: (email) => {
        const sql = 'SELECT * FROM users WHERE email = $1';
        return db.query(sql, [email])
    },
    signUp: (first_name, last_name, email, hashed_pw, sec_qns, sec_ans) => {
        const sql = 'INSERT INTO users(first_name,last_name,email,hashed_pw,sec_qns,sec_ans,reminder_days) VALUES($1,$2,$3,$4,$5,$6,3)';
        return db.query(sql, [first_name, last_name, email, hashed_pw, sec_qns, sec_ans])
    },
    checkPassword: (email) => {
        const sql = 'SELECT hashed_pw FROM users WHERE email = $1';
        return db.query(sql, [email])
    },
    getUsersDetail: (email) => {
        const sql = 'SELECT * FROM users WHERE email = $1';
        return db.query(sql, [email])
    }
};

module.exports = User;