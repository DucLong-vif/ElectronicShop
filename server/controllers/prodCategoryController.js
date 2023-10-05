const ProductCategory = require('../models/productCategory');
const asyncHandler = require('express-async-handler');

const createProdCategory = asyncHandler(async(req,res)=>{
    const response = await ProductCategory.create(req.body);
    return res.status(200).json({
        response : response ? true : false,
        createdCategory : response ? response : 'cannot create new product-category'
    })
})

const getAllProdCategory = asyncHandler(async(req,res)=>{
    const response = await ProductCategory.find();
    return res.status(200).json({
        response : response ? true : false,
        prodCategories : response ? response : 'cannot get all product-category'
    })
})

const updateCategory = asyncHandler(async(req,res)=>{
    const {pCid} = req.params
    const response = await ProductCategory.findByIdAndUpdate(pCid,req.body,{new : true})
    return res.status(200).json({
        response : response ? true : false,
        updatedCategory : response ? response : 'cannot update  product-category'
    })
})

const deleteCategory = asyncHandler(async(req,res)=>{
    const {pCid} = req.params
    const response = await ProductCategory.findOneAndDelete(pCid)
    return res.status(200).json({
        response : response ? true : false,
        deletedCategory : response ? response : 'cannot delete product-category'
    })
})

module.exports = {
    createProdCategory,
    getAllProdCategory,
    updateCategory,
    deleteCategory
}