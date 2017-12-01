const Controller = require('egg').Controller;
class getImgInfoController extends Controller {
    async create() {
        const ctx = this.ctx;
        let jsonData = ctx.request.body;
        let msgJson = {
            imgs:jsonData.imgs,
            imgsName:jsonData.imgsName,
            sizes:jsonData.sizes
        };
        let result;
        try{
            result = {
                code: '100',
                msg: '图片上传成功',
            };
        }catch (error){
            //ctx.logger.error(new Error('mailshare服务'));
            result = {
                code: '-1',
                msg: '图片上传失败',
            };
        }
        this.ctx.body = result;
    }
}
module.exports = getImgInfoController;