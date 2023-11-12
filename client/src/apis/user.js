import axios from '../axios';


export const apiRegister = (data) => axios({
    url:'/user/register',
    method :'post',
    data : data,
    //withCredentials : true,
})


export const apiFinalRegister = (token) => axios({
    url:'/user/finalregister/' + token,
    method :'post',
})

export const apiLogin = (data) => axios({
    url:'/user/login',
    method :'post',
    data : data,
})

export const apiForgotPassword = (data) => axios({
    url:'/user/forgotPassword',
    method :'post',
    data : data,
})

export const apiResetPassword = (data) => axios({
    url:'/user/resetPassword',
    method :'put',
    data : data,
})

export const apiGetCurrent = () => axios({
    url:'/user/current',
    method :'get',
})

export const apiGetUsers = (params) => axios({
    url:'/user/',
    method :'get',
    params
})

export const apiUpdateUser = (data,uid) => axios({
    url:'/user/'+uid,
    method :'put',
    data
})

export const apiDeleteUser = (uid) => axios({
    url:'/user/'+uid,
    method :'delete',
})