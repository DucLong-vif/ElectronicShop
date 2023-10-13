const ProductCategory = require('../models/productCategory');
const asyncHandler = require('express-async-handler');

const createProdCategory = asyncHandler(async(req,res)=>{
    const response = await ProductCategory.create(req.body);
    return res.status(200).json({
        response : response ? true : false,
        createdCategory : response ? response : 'Không thể tạo danh mục sản phẩm mới'
    })
})

const getAllProdCategory = asyncHandler(async(req,res)=>{
    const response = await ProductCategory.find();
    return res.status(200).json({
        response : response ? true : false,
        prodCategories : response ? response : 'Không thể có được tất cả danh mục sản phẩm'
    })
})

const updateCategory = asyncHandler(async(req,res)=>{
    const {pCid} = req.params
    const response = await ProductCategory.findByIdAndUpdate(pCid,req.body,{new : true})
    return res.status(200).json({
        response : response ? true : false,
        updatedCategory : response ? response : 'Không thể cập nhật danh mục sản phẩm'
    })
})

const deleteCategory = asyncHandler(async(req,res)=>{
    const {pCid} = req.params
    const response = await ProductCategory.findOneAndDelete(pCid)
    return res.status(200).json({
        response : response ? true : false,
        deletedCategory : response ? response : 'Không thể xóa danh mục sản phẩm'
    })
})

module.exports = {
    createProdCategory,
    getAllProdCategory,
    updateCategory,
    deleteCategory
}