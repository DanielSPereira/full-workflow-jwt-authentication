const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader ? authHeader.split(' ')[1] : false;

    if (!token) return res.status(401).json({ success: false, message: 'Not authorized!' })

    try {
        const secret = process.env.ACCESS_TOKEN_SECRET

        jwt.verify(token, secret)

        next()

    } catch (e) {
        res.status(400).json({ success: false, message: e.message })
    }
}