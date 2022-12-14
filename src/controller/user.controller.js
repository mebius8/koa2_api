const jwt = require('jsonwebtoken')
const {createUser, getUerInfo, updateById} = require('../service/user.service')
const {userRegisterError} = require('../constant/err.type')
const { JWT_SECRET } = require('../config/config.default')
class UserController {
    async register(ctx, next) {
        // 1. 获取数据
        // console.log(ctx.request.body)
        const {user_name, password} = ctx.request.body

        // 2. 操作数据库
        try {
            const res = await createUser(user_name, password)
            // 3. 返回结果
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name,
                },
            }
        } catch (err) {
            console.log(err)
            ctx.app.emit('error', userRegisterError ,ctx)
        }
    }

    async login(ctx, next) {
        const { user_name } = ctx.request.body
        try {
            //剔除密码，resUser只拿剩余属性（id, user_name, is_admin）
            const {password, ...res}  = await getUerInfo({user_name})
            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    //res用户信息（除密码），jwt密钥，过期时间300秒
                    token: jwt.sign(res, JWT_SECRET, {expiresIn: 300})
                }

            }
        }catch (err){
            console.error('用户登录失败',err)
        }
    }

    async changePassword(ctx, next){
        const id = ctx.state.user.id
        const password = ctx.request.body.password
        // console.log(id,password)
        if (await updateById({id, password})){
            ctx.body = {
                code: 0,
                message: 'change paaword success',
                result: ''
            }
        }else {
            ctx.body = {
                code: '10007',
                message: 'change paaword fail',
                result: ''

            }
        }
    }
}

module.exports = new UserController()