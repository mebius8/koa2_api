const Router = require('koa-router')
const router = new Router({prefix: '/goods'})

const { auth,hadAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/goods.middleware')
const { upload , create, update} = require('../controller/goods.controller')

// 商品图片上传
//暂时停用上传权限校验
// router.post('/upload', auth, hadAdminPermission, upload)
router.post('/upload',  upload )

// 商品发布
router.post('/',auth, hadAdminPermission, validator, create )

//修改商品接口
router.put('/:id', auth,hadAdminPermission,validator, update)

module.exports = router