const userLogin = require('./userLogin');
const userRegister = require('./userRegister');
const userLogout = require('./userLogout');
const userHome = require('./userHome');

module.exports = app => {
    app.use('/login', userLogin);
    app.use('/register', userRegister);
    app.use('/home', userHome);
    app.use('/logout', userLogout);
}
