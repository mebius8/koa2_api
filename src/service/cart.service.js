const Cart = require('../model/cart.model')
const {Op} = require('sequelize')

class CartService{
    async createOrUpdate(user_id, goods_id){
        let res = await Cart.findOne({
            where: {
                [Op.and]: {
                    user_id,
                    goods_id,
                }
            }
        })

        if(res) {
            //已经存在记录，number +1
            await res.increment('number')
            return await res.reload()
        } else{
            return await Cart.create({
                user_id,
                goods_id
            })
        }
    }
}

module.exports = new CartService()