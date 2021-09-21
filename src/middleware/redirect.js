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