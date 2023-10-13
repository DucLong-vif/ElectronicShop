const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');
const crypto = require('crypto')
const {generateAccessToken,generateRefreshToken} = require('../middleware/jwtHandler');
const makeToken = require('uniqid');

// const register = asyncHandler(async(req,res)=>{
//     const {email,password,firstName,lastName,phoneNumber} = req.body;
//     if(!email || !password || !firstName || !lastName||!phoneNumber){
//         return res.status(400).json({
//             success : false,
//             mes :'Missing inputs'
//         })
//     }
//     const user = await User.findOne({email : email});
//     if(user) throw new Error('user has existed');
//     else{
//         const newUser = await User.create(req.body);
//         return res.status(200).json({
//             success : newUser ? true : false,
//             mes : newUser ? 'register is successful . Please go login' :'something went wrong',
//             newUser : newUser,
//         })
//     }
// })



// const register = asyncHandler(async(req,res)=>{
//     const {email,password,firstName,lastName,phoneNumber} = req.body;
//     if(!email || !password || !firstName || !lastName||!phoneNumber){
//         return res.status(400).json({
//             success : false,
//             mes :'Không được để trống'
//         })
//     }
//     const user = await User.findOne({email : email});
//     if(user) throw new Error('Người dùng này đã tồn tại!')
//     else{
//         const token = makeToken();
//         res.cookie('dataregister',{...req.body,token},{httpOnly : true,maxAge : 15*60*1000});
//         const html = `Xin vui lòng click vào link đưới đây để hoàn tất đăng ký.
//             link này sẽ hết hạn sau 15 phút sẽ tự hủy giờ. 
//             <a href=${process.env.URL_SERVER}/api/user/finalregister/${token}>Click here</a>`
//             await sendMail({
//                 email,
//                 html,
//                 subject : 'Hoàn tất đăng ký tài khoản'
//             })
//             return res.json({
//                 success : true,
//                 mes : 'Vui lòng kiểm tra tài khoản email đang hoạt động của bạn'
//             })
//     }
    
// })


const register = asyncHandler(async(req,res)=>{
    const {email,password,firstName,lastName,phoneNumber} = req.body;
    if(!email || !password || !firstName || !lastName||!phoneNumber){
        return res.status(400).json({
            success : false,
            mes :'Không được để trống'
        })
    }
    const user = await User.findOne({email : email});
    if(user) throw new Error('Người dùng này đã tồn tại!')
    else{
        const token = makeToken();
        const emailEdited = btoa(email) + '@'+token
        const newUser = await User.create({
            email : emailEdited , password , firstName , lastName , phoneNumber 
        })
        if(newUser){
            const html = `<h2>Mã đăng ký : </h2> <br /> <blockquote>${token}<blockquote/>`
            await sendMail({
                email,
                html,
                subject : 'Hoàn tất đăng ký tài khoản'
            })
        }
        setTimeout(async() => {
            await User.deleteOne({email : emailEdited})
        },[10 * 60 * 1000]);
        return res.json({
            success : true,
            mes : 'Vui lòng kiểm tra tài khoản email đang hoạt động của bạn'
        })
    }
    
})

const finalRegister = asyncHandler(async(req,res)=>{
    // const cookie = req.cookies;
    const {token} = req.params;
    // if(!cookie || cookie?.dataregister?.token != token){
    //     res.clearCookie('dataregister')
    //     return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)
    // }
    const notActivedEmail = await User.findOne({email : new RegExp(`${token}$`)})
    if(notActivedEmail){
        notActivedEmail.email = atob(notActivedEmail?.email?.split('@')[0])
        notActivedEmail.save();
    }
    return res.status(200).json({
        success : notActivedEmail ? true : false,
        mes : notActivedEmail ? 'Đăng ký thành công. Vui lòng đăng nhập' : 'Đã xảy ra sự cố, vui lòng chờ trong giây lát'
    })
    // const newUser = await User.create({
    //     email : cookie?.dataregister?.email,
    //     password : cookie?.dataregister?.password,
    //     firstName : cookie?.dataregister?.firstName,
    //     lastName : cookie?.dataregister?.lastName,
    //     phoneNumber : cookie?.dataregister?.phoneNumber,

    // });
    // res.clearCookie('dataregister')
    // if(newUser) return res.redirect(`${process.env.CLIENT_URL}/finalregister/success`)
    // else return res.redirect(`${process.env.CLIENT_URL}/finalregister/failed`)
})

//Refresh token cập nhật mới access token
//Access token xác thực người đùng và quản lý người dùng
const login = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            success : false,
            mes :'Không được để trống'
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
        throw new Error('Thông tin không hợp lệ!');
    }
})


const getCurrent = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const user = await User.findById({ _id: _id}).select('-password -refreshToken -role')
    return res.status(200).json({
        success : user ? true : false,
        rs : user ? user : 'Không tìm thấy người dùng này'
    })
})

const refreshAccessToken = asyncHandler(async(req,res)=>{
    //lấy token từ cookies
    const cookie = req.cookies;
    //check xem có token hay không   
    if(!cookie && !cookie.refreshToken) throw new Error('Không có refreshToken trong cookies');
    //check token có hợp lệ hay ko
    const rs = await jwt.verify(cookie.refreshToken,process.env.JWT_SECRET);
    const response = await User.findOne({_id : rs._id,refreshToken : cookie.refreshToken})
    return res.status(200).json({
        success : response ? true : false,
        newAccessToken : response ? generateAccessToken(response._id,response.role) : 'RefreshToken Không phù hợp'
    })
})


const logout = asyncHandler(async(req,res)=>{
    const cookie = req.cookies;
    if(!cookie || !cookie.refreshToken) throw new Error('Không có refreshToken trong cookies');
    //xóa cái refresh token ở db
    await User.findOneAndUpdate({refreshToken: cookie.refreshToken},{refreshToken : ' '},{new : true})
    //xóa refresh token ở cookie trình duyệt
    res.clearCookie('refreshToken'),{
        httpOnly : true,
        success : true,
    }
    return res.status(200).json({
        success : true,
        mes : 'Đăng xuất thành công'
    })
})

const forgotPassword = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    if(!email) throw new Error('Không được để Email trống');
    const user = await User.findOne({email : email});
    if(!user) throw new Error('User not found');
    const resetToken =  user.createPasswordChangedToken();
    await user.save(); 
    const html = `Xin vui lòng click vào link đưới đây để thay đổi mật khẩu của bạn.
    link này sẽ hết hạn sau 15 phút sẽ tự hủy giờ. <a href=${process.env.CLIENT_URL}/reset-password/${resetToken}>Click here</a>`

    const data = {
        email,
        html,
        subject : 'Quên mật khẩu',
    }
    const rs = await sendMail(data)
    return res.status(200).json({
        success : rs.response?.includes('OK') ? true : false,
        mes : rs.response?.includes('OK') ? 'Hãy kiểm tra mail của bạn' : 'Mail đã có lỗi, hãy thử lại sau!'
    })
})


const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body
    if (!password || !token) throw new Error('Không được để trống')
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) throw new Error('Không hợp lệ resetToken này')
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangedAt = Date.now()
    user.passwordResetExpires = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'Đã cập nhật mật khẩu thành công' : 'Đã xảy ra sự cố'
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
    if(!_id) throw new Error('Không tìm thấy id này');
    const response = await User.findByIdAndDelete({_id : _id});
    return res.status(200).json({
        success : response ? true : false,
        deletedUser : response ? `Người dùng có email ${response.email} đã xóa`:'không có người dùng nào bị xóa'
    })
})

const updateUser = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    if(!_id || Object.keys(req.body).length === 0) throw new Error('Không tìm thấy id này');
    const response = await User.findByIdAndUpdate(_id,req.body, {new : true}).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updated : response ? response :'Đã xảy ra xự cố',
    })
})

const updateUserByAdmin = asyncHandler(async(req,res)=>{
    const {uid} = req.params;
    if( Object.keys(req.body).length === 0) throw new Error('Không tìm thấy người dùng này');
    const response = await User.findByIdAndUpdate(uid,req.body,{new : true}).select('-password -role -refreshToken');
    res.status(200).json({
        success : response ? true : false,
        updateUserByAD : response ? response :'Đã xảy ra sự cố',
    })
})

const updateUserAddress = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    if(!req.body.address) throw new Error('Không dược để trống');
    const response = await User.findByIdAndUpdate(_id,{$push:{address:req.body.address}},{new : true}).select('-password -role -refreshToken');
    return res.status(200).json({
        success : response ? true : false,
        updatedUserAddress : response ? response :'Đã xảy ra sự cố' ,
    })
})

const updateCart = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const {pid,quantity,color} = req.body;
    if(!pid || !quantity || !color) throw new Error('Không được để trống');
    const user = await User.findById(_id).select('cart');
    const alreadyCart = user?.cart?.find(el => el.product.toString() === pid);
    if(alreadyCart){
        if(alreadyCart.color === color){
            const response = await User.updateOne({cart:{$elemMatch:alreadyCart}},{$set:{"cart.$.quantity":quantity}},{new : true});
            return res.status(200).json({
                success : response ? true : false,
                updatedCart : response ? response : 'Không thể cập nhật giỏ hàng',
            })
        }else{
            const response = await User.findByIdAndUpdate(_id,{$push:{cart:{product:pid,quantity,color}}},{new : true});
            return res.status(200).json({
                success : response ? true : false,
                updatedCart : response ? response : 'Không thể cập nhật giỏ hàng',
            })
        }
    }else{
        const response = await User.findByIdAndUpdate(_id,{$push:{cart:{product:pid,quantity,color}}},{new : true});
        return res.status(200).json({
            success : response ? true : false,
            updatedCart : response ? response : 'Không thể cập nhật giỏ hàng',
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
    updateCart,
    finalRegister
}