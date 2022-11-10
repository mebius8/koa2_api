const fs = require('fs')

const Router = require('koa-router')
const router = new Router()

//获取当前目录下的所有文件夹名字
fs.readdirSync(__dirname).forEach((file => {
    // console.log(file)
    if (file !== 'index.js'){
        let r = require('./' + file)
        router.use(r.routes())
    }
}))

module.exports = router