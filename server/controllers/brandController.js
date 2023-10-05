const Brand = require('../models/brand');
const asyncHandler = require('express-async-handler');

const createNewBrand = asyncHandler(async(req,res)=>{
    const response = await Brand.create(req.body);
    return res.status(200).json({
        response : response ? true : false,
        createdBrand : response ? response : 'cannot create new brand'
    })
})

const getBrands = asyncHandler(async(req,res)=>{
    const response = await Brand.find();
    return res.status(200).json({
        response : response ? true : false,
        Brands : response ? response : 'cannot get all brand'
    })
})

const updateBrand = asyncHandler(async(req,res)=>{
    const {bid} = req.params
    const response = await Brand.findByIdAndUpdate(bid,req.body,{new : true})
    return res.status(200).json({
        response : response ? true : false,
        updatedBrand : response ? response : 'cannot update  brand'
    })
})

const deleteBrand = asyncHandler(async(req,res)=>{
    const {bid} = req.params
    const response = await Brand.findOneAndDelete(bid)
    return res.status(200).json({
        response : response ? true : false,
        deletedBrand : response ? response : 'cannot delete brand'
    })
})

module.exports = {
    createNewBrand,
    getBrands,
    updateBrand,
    deleteBrand
}