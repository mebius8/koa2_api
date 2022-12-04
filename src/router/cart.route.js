const Router = require('koa-router')
const router = new Router({prefix: '/carts'})

const { auth,hadAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')
const { add } = require('../controller/cart.controller')


router.post('/', auth, validator ,add)

module.exports = router