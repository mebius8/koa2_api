const Router = require('koa-router')
const router = new Router({prefix: '/goods'})

const { auth,hadAdminPermission } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/goods.middleware')
const { upload , create, update, remove, restore, findAll} = require('../controller/goods.controller')

// 商品图片上传
//暂时停用上传权限校验
// router.post('/upload', auth, hadAdminPermission, upload)
router.post('/upload',  upload )

// 商品发布
router.post('/',auth, hadAdminPermission, validator, create )

//修改商品接口
router.put('/:id', auth,hadAdminPermission,validator, update)

//删除商品接口
// router.delete('/:id',auth,hadAdminPermission, remove)

//商品下架
router.post('/:id/off',auth,hadAdminPermission, remove)

//商品上架
router.post('/:id/on',auth,hadAdminPermission, restore)

//获取商品列表
router.get('/', findAll)


module.exports = router