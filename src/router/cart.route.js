const Router = require('koa-router')
const router = new Router({prefix: '/carts'})

const { auth,hadAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')
const { add ,findAll } = require('../controller/cart.controller')

//添加到购物车接口
router.post('/', auth, validator({ goods_id: 'number'}) ,add)

//获取购物车列表
router.get('/',auth, findAll)

//更新购物车
router.patch('/:id', auth,
    validator({
    number: {type: 'number', require: false},
    selected: {type: 'bool', require: false}
    }),
    (ctx) => {
    ctx.body = ctx.request.params.id
    }

)

module.exports = router