const bcrypt = require('bcrypt');

const generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
};

const isValidPassword = (plainTextPassword, passwordHash) => {
    return bcrypt.compareSync(plainTextPassword, passwordHash)
};

module.exports = { generateHash, isValidPassword }