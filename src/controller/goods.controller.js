const path = require('path')

const {fileUploadError ,unsupportedFileType, publishGoodsError, invalidGoodsID} = require('../constant/err.type')
const { createGoods, updateGoods ,removeGoods, restoreGoods, findGoods} = require('../service/goods.service')

class GoodsController{
    async upload(ctx, next){
        // console.log(ctx.request.files.file)
        const {file} = ctx.request.files
        console.log(file.mimetype)
        const fileTypes = ['image/jpeg']
        if (file){
            if (!fileTypes.includes(file.mimetype)){
                return ctx.app.emit('error', unsupportedFileType, ctx)
            }
            ctx.body = {
                code: 0,
                message: '商品上传成功',
                result: {
                    good_img: path.basename(file.filepath)
                }
            }
        }else{
            return ctx.app.emit('error', fileUploadError, ctx)
        }
        // ctx.body = 'shang chaung chenggong'
    }

    async create(ctx){
        //调用service的createGoods方法

        try {
            const { updatedAt, createdAt, ...res } = await createGoods(ctx.request.body)
            ctx.body = {
                code: 0,
                message: '发布商品成功 ',
                result: res
            }
        }catch (e) {
            console.error(e)
            return ctx.app.emit('error', publishGoodsError, ctx)
        }
    }

    async update(ctx){
        try{
            const res = await updateGoods(ctx.params.id, ctx.request.body)
            if(res){
                ctx.body = {
                    code: 0,
                    message: '修改商品成功',
                    result:''
                }
            }else{
                return ctx.app.emit('error', invalidGoodsID, ctx)
            }
        }catch (e){
            console.error(e)


        }
        ctx.body = '修改商品成功'
    }

    async remove(ctx){
        const res = await removeGoods(ctx.params.id)
        console.log(res)
        if(res){
            ctx.body = {
                code: 0,
                message: '下架商品成功',
                result:''
            }
        }else {
            return ctx.app.emit('error', invalidGoodsID, ctx)
        }

    }

    async restore(ctx){
        const res = await restoreGoods(ctx.params.id)
        if(res){
            ctx.body = {
                code: 0,
                message: '上架商品成功',
                result:''
            }
        }else{
            return ctx.app.emit('error', invalidGoodsID, ctx)
        }
    }

    async findAll(ctx){
        const { pageNum = 1, pageSize = 10 } = ctx.request.query

        const res = await findGoods(pageNum, pageSize)
        ctx.body = {
            code: 0,
            message: '获取商品列表成功',
            result: res
        }
    }
}

module.exports = new GoodsController()