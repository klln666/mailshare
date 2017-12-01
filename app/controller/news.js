const Controller = require('egg').Controller;

class NewsController extends Controller {
    async list() {
        const ctx = this.ctx;
        const page = ctx.query.page || 1;
        const dataList = {
            lis: [
                { id: 1, title: 'this is news 1', url: '/news/1' },
                { id: 2, title: 'this is news 2', url: '/news/2' }
            ]
        };
        await ctx.render('news/list.htm', dataList);
    }
}

module.exports = NewsController;
