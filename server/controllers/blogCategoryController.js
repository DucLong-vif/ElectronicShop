const BlogCategory = require('../models/blogCategory');
const asyncHandler = require('express-async-handler');

const createProdCategory = asyncHandler(async(req,res)=>{
    const response = await BlogCategory.create(req.body);
    return res.status(200).json({
        response : response ? true : false,
        createdCategory : response ? response : 'cannot create new blog-category'
    })
})

const getAllProdCategory = asyncHandler(async(req,res)=>{
    const response = await BlogCategory.find().select('title _id');
    return res.status(200).json({
        response : response ? true : false,
        blogCategories : response ? response : 'cannot get all blog-category'
    })
})

const updateCategory = asyncHandler(async(req,res)=>{
    const {bCid} = req.params
    const response = await BlogCategory.findByIdAndUpdate(bCid,req.body,{new : true})
    return res.status(200).json({
        response : response ? true : false,
        updatedCategory : response ? response : 'cannot update  blog-category'
    })
})

const deleteCategory = asyncHandler(async(req,res)=>{
    const {bCid} = req.params
    const response = await BlogCategory.findOneAndDelete(bCid)
    return res.status(200).json({
        response : response ? true : false,
        deletedCategory : response ? response : 'cannot delete blog-category'
    })
})

module.exports = {
    createProdCategory,
    getAllProdCategory,
    updateCategory,
    deleteCategory
}