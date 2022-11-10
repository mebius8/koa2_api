const Koa = require('koa')
const KoaBody = require('koa-body')
const router = require('../router/index')
const errHandler = require('./errHandler')

const app = new Koa()
//KoaBody先注册
app.use(KoaBody())
//注册路由
app.use(router.routes())
//request method不匹配时候，在response的header中显示Allow的method
app.use(router.allowedMethods())
app.on('error', errHandler)

module.exports = app