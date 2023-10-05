const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const crypto = require('crypto')
const {generateAccessToken,generateRefreshToken} = require('../middleware/jwtHandler');
const register = asyncHandler(async(req,res)=>{
    const {email,password,firstName,lastName,phoneNumber} = req.body;
    if(!email || !password || !firstName || !lastName||!phoneNumber){
        return res.status(400).json({
            success : false,
            mes :'Missing inputs'
        })
    }
    const user = await User.findOne({email : email});
    if(user) throw new Error('user has existed');
    else{
        const newUser = await User.create(req.body);
        return res.status(200).json({
            success : newUser ? true : false,
            mes : newUser ? 'register is successful . Please go login' :'something went wrong',
            newUser : newUser,
        })
    }
})
//Refresh token cập nhật mới access token
//Access token xác thực người đùng và quản lý người dùng
const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            success : false,
            mes :'Missing inputs'
        })
    }
    const response = await User.findOne({email});
    if(response && await response.isCorrectPassword(password)){
        //tách passwork với role ra khỏi response
        const {password,role,refreshToken,...useData} = response.toObject();
        //tạo access token
        const accessToken = generateAccessToken(response._id, role);
        const newRefreshToken = generateRefreshToken(response._id);
        //lưu refresh token vào database
        await User.findByIdAndUpdate(response._id,{refreshToken : newRefreshToken},{new : true, password});
        //lưu refresh token vào cookie
        res.cookie('refreshToken',newRefreshToken,{httpOnly:true,maxAge: 365 * 24 *60 * 60 * 1000});
        return res.status(200).json({
            success : true,
            accessToken,
            useData,
        })
    }
    else{
        throw new Error('Invalid credentials!');
    }
})


const getCurrent = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const user = await User.findById({ _id: _id}).select('-password -refreshToken -role')
    return res.status(200).json({
        success : user ? true : false,
        rs : user ? user : 'User not found'
    })
})

const refreshAccessToken = asyncHandler(async(req,res)=>{
    //lấy token từ cookies
    const cookie = req.cookies;
    //check xem có token hay không   
    if(!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookies');
    //check token có hợp lệ hay ko
    const rs = await jwt.verify(cookie.refreshToken,process.env.JWT_SECRET);
    const response = await User.findOne({_id : rs._id,refreshToken : cookie.refreshToken})
    return res.status(200).json({
        success : response ? true : false,
        newAccessToken : response ? generateAccessToken(response._id,response.role) : 'Refresh token not matched'
    })
})


const logout = asyncHandler(async(req,res)=>{
    const cookie = req.cookies;
    if(!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookies');
    //xóa cái refresh token ở db
    await User.findOneAndUpdate({refreshToken: cookie.refreshToken},{refreshToken : ' '},{new : true})
    //xóa refresh token ở cookie trình duyệt
    res.clearCookie('refreshToken'),{
        httpOnly : true,
        success : true,
    }
    return res.status(200).json({
        success : true,
        mes : 'Logout is done'
    })
})

const forgotPassword = asyncHandler(async(req,res)=>{
    const {email} = req.query;
    if(!email) throw new Error('Messing email');
    const user = await User.findOne({email : email});
    if(!user) throw new Error('User not found');
    const resetToken =  user.createPasswordChangedToken();
    await user.save(); 
    const html = `Xin vui lòng click vào link đưới đây để thay đổi mật khẩu của bạn.
    link này sẽ hết hạn sau 15 phút sẽ tự hủy giờ. <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`

    const data = {
        email,
        html,
    }
    const rs = await sendMail(data)
    return res.status(200).json({
        success : true,
        rs : rs,
    })
})


const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body
    if (!password || !token) throw new Error('Missing input')
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) throw new Error('Invalid reset token')
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangedAt = Date.now()
    user.passwordResetExpires = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'Updated password' : 'Something went wrong'
    })
})


const getUsers = asyncHandler(async (req,res)=>{
    const response = await User.find().select('-password -refreshToken -role');
    return res.status(200).json({
        success : response ? true : false,
        users  : response,
    })
})


const deleteUser = asyncHandler(async(req,res)=>{
    const {_id} = req.query;
    if(!_id) throw new Error('id not found');
    const response = await User.findByIdAndDelete({_id : _id});
    return res.status(200).json({
        success : response ? true : false,
        deletedUser : response ? `user with email ${response.email} deleted`:'no user deleted'
    })
})

const updateUser = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    if(!_id || Object.keys(req.body).length === 0) throw new Error('_id not found');
    const response = await User.findByIdAndUpdate(_id,req.body, {new : true}).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updated : response ? response :'Something went wrong',
    })
})

const updateUserByAdmin = asyncHandler(async(req,res)=>{
    const {uid} = req.params;
    if( Object.keys(req.body).length === 0) throw new Error('uid not found');
    const response = await User.findByIdAndUpdate(uid,req.body,{new : true}).select('-password -role -refreshToken');
    res.status(200).json({
        success : response ? true : false,
        updateUserByAD : response ? response :'Something went wrong',
    })
})

const updateUserAddress = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    if(!req.body.address) throw new Error('Missing inputs');
    const response = await User.findByIdAndUpdate(_id,{$push:{address:req.body.address}},{new : true}).select('-password -role -refreshToken');
    return res.status(200).json({
        success : response ? true : false,
        updatedUserAddress : response ? response :'Something went wrong ok em' ,
    })
})

const updateCart = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const {pid,quantity,color} = req.body;
    if(!pid || !quantity || !color) throw new Error('Missing input');
    const user = await User.findById(_id).select('cart');
    const alreadyCart = user?.cart?.find(el => el.product.toString() === pid);
    if(alreadyCart){
        if(alreadyCart.color === color){
            const response = await User.updateOne({cart:{$elemMatch:alreadyCart}},{$set:{"cart.$.quantity":quantity}},{new : true});
            return res.status(200).json({
                success : response ? true : false,
                updatedCart : response ? response : 'cannot updated cart',
            })
        }else{
            const response = await User.findByIdAndUpdate(_id,{$push:{cart:{product:pid,quantity,color}}},{new : true});
            return res.status(200).json({
                success : response ? true : false,
                updatedCart : response ? response : 'cannot updated cart',
            })
        }
    }else{
        const response = await User.findByIdAndUpdate(_id,{$push:{cart:{product:pid,quantity,color}}},{new : true});
        return res.status(200).json({
            success : response ? true : false,
            updatedCart : response ? response : 'cannot updated cart',
        })
    }
})

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin,
    updateUserAddress,
    updateCart
}