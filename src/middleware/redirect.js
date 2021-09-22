/*
    middleware that checks if the user has a sessionID or not
    if present, user is redirected to /home
    if not present, user is redirected to /login
*/


function redirectHome(req, res, next) {
    if(req.session.userID) {
        res.redirect('/home')
    } else {
        next();
    }
}

function redirectLogin(req, res, next) {
    if(!req.session.userID) {
        res.redirect('/login')
    } else {
        next();
    }
}

module.exports = {
    redirectHome,
    redirectLogin
}