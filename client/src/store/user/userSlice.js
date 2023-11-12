import {  createSlice } from "@reduxjs/toolkit";
import *as actions from './asyncActions'
 
export const userSlice = createSlice({
    name:'user',
    initialState:{
        isLoggedIn : false,
        current : null,
        token : null,
        isLoading : false,
        mes :'' 
    },
    reducers:{
        login:(state,action) =>{
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token
        },
        logout:(state,action) =>{
            state.isLoggedIn = false
            state.token = null
            state.current = null
            state.isLoading = false
            state.mes = ''
        },
        clearMessage : (state) => {
            state.mes = ''
        }
    },
    //code logic xu ly async action
    extraReducers:(builder)=>{
        //bat dau xu ly action (Promise pending)
        builder.addCase(actions.getCurrent.pending,(state)=>{
            //bat trang thai pending
            state.isLoading = true;
        });
        builder.addCase(actions.getCurrent.fulfilled,(state,action)=>{
            //tat trang thai loading ,luu thong tin cate vao store
            // console.log(action)
            state.isLoading = false;
            state.current = action.payload;
            state.isLoggedIn = true;
        });
        builder.addCase(actions.getCurrent.rejected,(state,action)=>{
            //tat trang thai loading ,luu thong tin loi vao store
            state.isLoading =false;
            state.current = null;
            state.isLoggedIn = false;
            state.token = null;
            state.mes = 'Thời gian đăng nhập của bạn đã hết hạn, Hãy đăng nhập lại!'
        })
    }
})

export const {login ,logout , clearMessage} = userSlice.actions;
export default userSlice.reducer;