
const { createOrUpdate } = require('../service/cart.service')

class CartController{
    //添加到购物车
    async add(ctx){
        // ctx.body = 'success'
        const user_id = ctx.state.user.id
        const goods_id = ctx.request.body.goods_id

        const res = await createOrUpdate(user_id, goods_id)

        ctx.body = {
            code: 0,
            message: '添加到购物车成功',
            result: res
        }
    }
}

module.exports = new CartController()