import {  createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncActions';

export const appSlice = createSlice({
    name:'app',
    initialState:{
        categories :null,
        isLoading:false
    },
    reducers:{
        
    },

    //code logic xu ly async action
    extraReducers:(builder)=>{
        //bat dau xu ly action (Promise pending)
        builder.addCase(actions.getCategories.pending,(state)=>{
            //bat trang thai pending
            state.isLoading = true;
        });
        builder.addCase(actions.getCategories.fulfilled,(state,action)=>{
            //tat trang thai loading ,luu thong tin cate vao store
            // console.log(action)
            state.isLoading = false;
            state.categories = action.payload;
        });
        builder.addCase(actions.getCategories.rejected,(state,action)=>{
            //tat trang thai loading ,luu thong tin loi vao store
            state.isLoading =false;
            state.errorMessage = action.payload.message;
        })
    }
})

// export const {reducers } = appSlice.actions;
export default appSlice.reducer;