const adminMiddleware = require('../middlewares/admin.middleware')
const userMiddleware = require('../middlewares/user.middleware')

const router = require('express').Router()

router.use('/auth', require('./auth.route'))
router.use('/admin', adminMiddleware, require('./admin.route'))
router.use('/user', userMiddleware, require('./user.route'))

module.exports = router
