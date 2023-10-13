const BlogCategory = require('../models/blogCategory');
const asyncHandler = require('express-async-handler');

const createProdCategory = asyncHandler(async(req,res)=>{
    const response = await BlogCategory.create(req.body);
    return res.status(200).json({
        response : response ? true : false,
        createdCategory : response ? response : 'Không thể tạo danh mục của blog mới'
    })
})

const getAllProdCategory = asyncHandler(async(req,res)=>{
    const response = await BlogCategory.find().select('title _id');
    return res.status(200).json({
        response : response ? true : false,
        blogCategories : response ? response : 'Không thể lấy tất cả danh mục của blog'
    })
})

const updateCategory = asyncHandler(async(req,res)=>{
    const {bCid} = req.params
    const response = await BlogCategory.findByIdAndUpdate(bCid,req.body,{new : true})
    return res.status(200).json({
        response : response ? true : false,
        updatedCategory : response ? response : 'Không thể cập nhật danh mục của blog'
    })
})

const deleteCategory = asyncHandler(async(req,res)=>{
    const {bCid} = req.params
    const response = await BlogCategory.findOneAndDelete(bCid)
    return res.status(200).json({
        response : response ? true : false,
        deletedCategory : response ? response : 'Không thể xóa danh mục của blog'
    })
})

module.exports = {
    createProdCategory,
    getAllProdCategory,
    updateCategory,
    deleteCategory
}