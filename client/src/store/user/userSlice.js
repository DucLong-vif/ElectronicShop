import {  createSlice } from "@reduxjs/toolkit";
import *as actions from './asyncActions'
 
export const userSlice = createSlice({
    name:'user',
    initialState:{
        isLoggedIn : false,
        current : null,
        token : null,
        isLoading : false
    },
    reducers:{
        login:(state,action) =>{
            state.isLoggedIn = action.payload.isLoggedIn;
            state.token = action.payload.token
        },
        logout:(state,action) =>{
            state.isLoggedIn = false
            state.token = null
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
        });
        builder.addCase(actions.getCurrent.rejected,(state,action)=>{
            //tat trang thai loading ,luu thong tin loi vao store
            state.isLoading =false;
            state.current = null;
        })
    }
})

export const {login ,logout} = userSlice.actions;
export default userSlice.reducer;