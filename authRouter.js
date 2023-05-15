const Router = require('express')
const router = new Router()
const controller = require('./authController')
const authMiddleware = require('./auth-middleware')

router.post('/login', controller.login)
router.post('/registration', controller.registration)
router.get('/users', controller.getUsers)
router.get('/user/:id', authMiddleware, controller.getUserById)
router.get('/test', (req, res) => {
    return res.json({message: 'WORK'});
});


module.exports = router