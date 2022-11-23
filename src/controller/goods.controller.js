const path = require('path')

const {fileUploadError ,unsupportedFileType, publishGoodsError, invalidGoodsID} = require('../constant/err.type')
const { createGoods, updateGoods } = require('../service/goods.service')

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
}

module.exports = new GoodsController()