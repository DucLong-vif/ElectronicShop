const Blog = require('../models/blog');
const asyncHandler = require('express-async-handler');


const createNewBlog = asyncHandler(async(req,res)=>{
    const {title,description,category} = req.body;
    if(!title || !description || !category) throw new Error('Messing inputs')
    const response = await Blog.create(req.body);
    return res.status(200).json({
        success : response ? true : false,
        createdBlog : response ? response : 'cannot create new blog '
    })
})

const updateBlog = asyncHandler(async(req,res)=>{
    const {bid} = req.params;
    if(Object.keys(req.body).length === 0) throw new Error('Messing inputs')
    const response = await Blog.findByIdAndUpdate(bid,req.body,{new : true});
    return res.status(200).json({
        success : response ? true : false,
        updatedBlog : response ? response : 'cannot update blog '
    })
})


const getBlogs = asyncHandler(async(req,res)=>{
    const response = await Blog.find();
    return res.status(200).json({
        success : response ? true : false,
        getBlogs : response ? response : 'cannot get all blog'
    })
})


/**
 * khi người dùng like một blog thì:
 * check xem người dùng đó trước đo có dislike hay không => bỏ dislike
 * check xem người dùng đó trước đo có like hay không => bỏ like / hoặc thêm like
 */

const likeBlog = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const {bid} = req.params;
    if(!bid) throw new Error('Messing inputs');
    const blog = await Blog.findById(bid);
    const alreadyDisliked = blog?.dislikes.find(el => el.toString() === _id );
    if(alreadyDisliked){
        const response = await Blog.findByIdAndUpdate(bid,{$pull: {dislikes : _id}},{new : true})
        return res.status(200).json({
            success : response ? true : false,
            rs : response
        })
    }
    const isLiked = blog?.likes.find(el => el.toString() === _id);
    if(isLiked) {
        const response = await Blog.findByIdAndUpdate(bid,{$pull : {likes : _id}},{new : true});
        return res.status(200).json({
            success : response ? true : false,
            rs : response
        })
    }
    else{
        const response = await Blog.findByIdAndUpdate(bid,{$push : {likes : _id}},{new : true});
        return res.status(200).json({
            success : response ? true : false,
            rs : response
        })
    }
})

const dislikeBlog = asyncHandler(async(req,res) =>{
    const {_id} = req.user;
    const {bid} = req.params;
    if(!bid) throw new Error('Messing inputs');
    const blog = await Blog.findById(bid);
    const alreadyLiked = blog?.likes.find(el => el.toString() === _id );
    if(alreadyLiked){
        const response = await Blog.findByIdAndUpdate(bid,{$pull: {likes : _id}},{new : true})
        return res.status(200).json({
            success : response ? true : false,
            rs : response
        })
    }
    const isDislike = blog?.dislikes.find(el => el.toString() === _id);
    if(isDislike) {
        const response = await Blog.findByIdAndUpdate(bid,{$pull : {dislikes : _id}},{new : true});
        return res.status(200).json({
            success : response ? true : false,
            rs : response
        })
    }
    else{
        const response = await Blog.findByIdAndUpdate(bid,{$push : {dislikes : _id}},{new : true});
        return res.status(200).json({
            success : response ? true : false,
            rs : response
        })
    }
})


const getBLog =asyncHandler(async(req,res)=>{
    const {bid} = req.params;
    const blog = await Blog.findByIdAndUpdate(bid,{$inc:{numberViews : 1}},{new : true}).populate('likes','firstName lastName').populate('dislikes','firstName lastName');
    return res.status(200).json({
        success : blog ? true : false,
        rs : blog,
    })
})

const deleteBlog = asyncHandler(async(req,res)=>{
    const {bid} = req.params;
    const blog = await Blog.findByIdAndDelete(bid);
    return res.status(200).json({
        success : blog ? true : false,
        deletedBlog : blog || 'something went wrong',
    })
})

const uploadImageBlog = asyncHandler(async(req,res)=>{
    const {bid} = req.params;
    if(!req.file) throw new Error('Missing inputs');
    const response = await Blog.findByIdAndUpdate(bid,{image:req.file.path},{new : true});
    return res.status(200).json({
        statusCode: response ? true : false,
        uploadImage : response ? response : 'cannot upload image Blog',
    })
})
module.exports = {
    createNewBlog,
    updateBlog,
    getBlogs,
    likeBlog,
    dislikeBlog,
    getBLog,
    deleteBlog,
    uploadImageBlog
}