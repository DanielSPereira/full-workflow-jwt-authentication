const { Router } = require("express");
const jwt = require("jsonwebtoken");

const checkAuth = require('./checkAuth')
const Users = require('./Users')

const routes = Router();

routes.post('/login', (req,res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    console.log(req.body)

    const user = Users.find(user => user.userName == userName);

    if (!user) return res.status(404).json({ success: false, message: 'Usuário não encontrado!' });

    if (password !== user.password) return res.status(404).json({ success: false, message: 'Senha inválida!' })

    try {
        const User = { id: user.id }

        const token = jwt.sign(User, process.env.ACCESS_TOKEN_SECRET)

        console.log('token', token)

        res.status(200).json({ success: true, user: { id: user.id, userName: user.userName, token: token } })
    } catch (e) {
        console.log('erro ao criar o token', e)
        
        res.json({
            success: false,
            message: e.message
        })
    }
})

routes.get('/secret-information', checkAuth, (req, res) => {
    res.status(200).json({
        secret: 'Congratulations, you have a valid JWT Token!'
    })
})

routes.get('/isAuthenticated', checkAuth, (req, res) => {
    res.status(200).json({
        authenticated: true
    })
})

module.exports = routes;