const path = require('path')

const {fileUploadError} = require('../constant/err.type')

class GoodsController{
    async upload(ctx, next){
        console.log(ctx.request.files.file)
        const {file} = ctx.request.files
        if (file){
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
}

module.exports = new GoodsController()