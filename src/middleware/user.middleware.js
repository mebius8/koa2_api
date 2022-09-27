const bcrypt = require('bcryptjs')
const {getUerInfo} = require('../service/user.service')
const {userFormateError, userAlreadyExited, userRegisterError} = require('../constant/err.type')

const userValidator = async (ctx, next) => {
    const {user_name, password} = ctx.request.body
    if (!user_name || !password) {
        console.error('用户名或密码为空', ctx.request.body)
        ctx.app.emit('error', userFormateError, ctx)
        return
    }

    await next()
}

const verifyUser = async (ctx, next) => {
    const {user_name} = ctx.request.body

    try {
        const res = await getUerInfo({user_name})
        if(res){
            console.error('用户名已经存在', {user_name})
            ctx.app.emit('error', userAlreadyExited, ctx)
            return
        }
    }catch (err){
        console.log('获取用户信息错误', err)
        ctx.app.emit('error', userAlreadyExited, ctx)
        return
    }

    await next()
}


const cryptPassword = async (ctx, next) => {
    const {password} = ctx.request.body
    const salt = bcrypt.genSaltSync(10);
    //hash保存是密文
    const hash = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hash

    await next()

}

module.exports = {
    userValidator,
    verifyUser,
    cryptPassword,
}


