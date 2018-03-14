module.exports = function(res, req, next) {
    const { session } = req;

    if (!session.user) {
        session.user = {
            username: '',
            cart: [],
            total: 0.00
        };
        next();
    }
};