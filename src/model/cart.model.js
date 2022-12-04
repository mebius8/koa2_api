const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Cart = seq.define('zd_carts', {
        goods_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '商品ID'
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '用户ID'
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            comment: '商品数量'
        },
        selected: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            comment: '是否选中'
        },
    },
    {
        paranoid: true,
    }

)

Cart.sync({ force: true })

module.exports = Cart