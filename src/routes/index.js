const userLogin = require('./userLogin');
const userRegister = require('./userRegister');

module.exports = app => {
    app.use('/api/login', userLogin);
    app.use('/api/register', userRegister);
}