// Middleware para rutas de cliente
const clientAuthMiddleware = (req, res, next) => {
    if (req.session.isClient || req.session.google) {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports=clientAuthMiddleware;