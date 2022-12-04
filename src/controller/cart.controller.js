
const { createOrUpdate ,findCart } = require('../service/cart.service')

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

    //
    async findAll(ctx){
        const  { pageNum = 1, pageSize = 10 } = ctx.request.query

        const res = await findCart(pageNum, pageSize)

        ctx.body = {
            code: 0,
            message: '获取购物车列表成功',
            result: res
        }
    }
}

module.exports = new CartController()