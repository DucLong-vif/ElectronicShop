const { response } = require('express');
const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');


const createProduct = asyncHandler(async(req,res)=>{
    if(Object.keys(req.body).length === 0) throw new Error('Missing inputs');
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title);
    const newProduct = await Product.create(req.body);
    return res.status(200).json({
        success : newProduct ? true : false,
        createdProduct : newProduct ? newProduct : 'Cannot create new product',
    })
})

const getProduct = asyncHandler(async(req,res)=>{
    const {pid} = req.params;
    const product =await Product.findById(pid);
    return res.status(200).json({
        success : product ? true : false,
        productData : product ? product : 'cannot get product'
    })
})

const getAllProducts = asyncHandler(async(req,res)=>{
    const queries = {...req.query}
    //Tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit','sort','page','fields']
    excludeFields.forEach(el => delete queries[el]);

    //Format lại các operators cho đúng cú pháp mongoose
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g,matchEl=>`$${matchEl}`)
    const formatQueries = JSON.parse(queryString)

    //Filtering
    if(queries?.title) formatQueries.title = {$regex : queries.title, $options : 'i'}
    let queryCommand = Product.find(formatQueries)



    //Sorting
    //split abc,xyz => [abc,xyz] join => abc xyz
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    }


    //Fields limiting
    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ');
        queryCommand = queryCommand.select(fields);
    }

    //pagination
    //limit : số object lấy 1 gọi API
    //skip : bỏ qua  số phần tử muốn lấy : 2
    //vd  123 ... 10 bỏ qua 1 2 lấy từ 3 trở đi
    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
    const skip = (page - 1)*limit;
    queryCommand.skip(skip).limit(limit);

    //Execute query
    //số lượng sp thỏa mãn điều kiện !== số lượng trả về 1 lần gọi APi
    queryCommand.then(async(response)=>{
        const counts = await Product.find(formatQueries).countDocuments();
        return res.status(200).json({
            success : response ? true : false,
            products : response ? response : 'cannot get all products',
            counts : counts,
        })
    }).catch((err)=>{
        console.log(err.reason)
    })
})
const updateProduct = asyncHandler(async(req,res)=>{
    const {pid} = req.params;
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updateProduct = await Product.findByIdAndUpdate(pid,req.body,{new : true})
    return res.status(200).json({
        success: updateProduct ? true : false,
        upProduct : updateProduct ? updateProduct : 'cannot update product'
    })
})

const deleteProduct = asyncHandler(async(req,res)=>{
    const {pid} = req.params;
    const deleteProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success : deleteProduct ? true : false,
        deleteProd : deleteProduct ? deleteProduct : 'cannot delete product'
    })
})

const ratings = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const {star,comment,pid} = req.body;
    if(!star || !pid) throw new Error('Messing inputs')
    //
    const ratingProduct = await Product.findById(pid);
    const alreadyRating = ratingProduct?.ratings?.find(el =>el.postedBy.toString() === _id);
    if(alreadyRating){
        //update start & comment
        await Product.updateOne({
            ratings : {$elemMatch : alreadyRating}
        },{
            $set : { "ratings.$.star" : star, "ratings.$.comment" : comment, "ratings.$.pid" : pid}
        },{new : true})
    }
    else{
        //add star  & comment
        await Product.findByIdAndUpdate(pid,{$push:{ratings :{star,comment,postedBy : _id}}},{new : true})
    }
    //sum ratings 
    const updatedProduct = await Product.findById(pid);
    const ratingCount = updatedProduct.ratings.length;
    const sumRatings = updatedProduct.ratings.reduce((sum,el)=>sum + +el.star,0)
    updatedProduct.totalRatings = Math.round(sumRatings*10/ratingCount)/10;
    await updatedProduct.save();
    return res.status(200).json({
        status : true,
        updatedProduct,
    })
})


const uploadImageProduct = asyncHandler(async(req,res)=>{
    const {pid} = req.params;
    if(!req.files) throw new Error('Missing inputs');
    const response = await Product.findByIdAndUpdate(pid,{$push:{images:{$each: req.files.map(el => el.path)}}},{new : true});
    return res.status(200).json({
        statusCode: response ? true : false,
        uploadImage : response ? response : 'cannot upload image product',
    })
})

module.exports = {
    createProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    ratings,
    uploadImageProduct
}