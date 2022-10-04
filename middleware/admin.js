module.exports = function(req, res, next){
    if(!req.auth.isAdmin) return res.status(403).send('access denied')
    next();
}