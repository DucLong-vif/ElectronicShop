const userRouter = require('./user');
const productRouter = require('./product');
const prodCategory = require('./productCategory');
const blogCategory = require('./blogCategory');
const blogRouter = require('./blog');
const brandRouter = require('./brand');
const coupon = require('./coupon');
const order = require('./order');
const insert = require('./insert')
const {notFound,errHandler} = require('../middleware/errHandler');
const initRoutes = (app)=>{
    app.use('/api/user',userRouter);
    app.use('/api/product',productRouter);
    app.use('/api/prodCategory',prodCategory);
    app.use('/api/blogCategory',blogCategory);
    app.use('/api/blogRouter',blogRouter);
    app.use('/api/brand',brandRouter);
    app.use('/api/coupon',coupon);
    app.use('/api/order',order);
    app.use('/api/insert',insert);

    app.use(notFound);
    app.use(errHandler);
}

module.exports = initRoutes