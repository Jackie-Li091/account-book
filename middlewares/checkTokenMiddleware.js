const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/config');

module.exports = (req, res, next) => {
    const token = req.get('token');
    if (!token) {
        return res.json({
            code: '2003',
            msg: 'No token',
            data: null
        });
    }

    jwt.verify(token, SECRET_KEY, (err, data) => {
        if (err) {
            return res.json({
                code: '2004',
                msg: 'token not valid',
                data: null
            });
        }

        //get user info
        req.user = data;

        next();
    });
}