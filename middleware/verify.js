// Middleware para rutas de cliente
const clientAuthMiddleware = (req, res, next) => {
    if (req.session.isClient) {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports=clientAuthMiddleware;