const path = require('path')

const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')

const router = require('../router/index')
const errHandler = require('./errHandler')

const app = new Koa()
//KoaBody先注册
app.use(KoaBody({
    multipart: true,
    formidable: {
        //在option里的相对路径，不是相对的当前文件，而是相对于precess.cwd()
        uploadDir: path.join( __dirname, '../upload'),
        keepExtensions: true
    }
}))
//设置默认的静态文件夹地址
app.use(KoaStatic(path.join( __dirname, '../upload')))
app.use(parameter(app))
//注册路由
app.use(router.routes())
//request method不匹配时候，在response的header中显示Allow的method
app.use(router.allowedMethods())
app.on('error', errHandler)

module.exports = app