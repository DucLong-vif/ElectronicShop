import {  createSlice } from "@reduxjs/toolkit";
import {getNewProducts} from './asyncActions';

export const productSlice = createSlice({
    name:'product',
    initialState:{
        newProducts : null,
        isLoading : false,
    },
    reducers:{
        
    },

    //code logic xu ly async action
    extraReducers:(builder)=>{
        //bat dau xu ly action (Promise pending)
        builder.addCase(getNewProducts.pending,(state)=>{
            //bat trang thai pending
            state.isLoading = true;
        });
        builder.addCase(getNewProducts.fulfilled,(state,action)=>{
            //tat trang thai loading ,luu thong tin cate vao store
            // console.log(action)
            state.isLoading = false;
            state.newProducts = action.payload;
        });
        builder.addCase(getNewProducts.rejected,(state,action)=>{
            //tat trang thai loading ,luu thong tin loi vao store
            state.isLoading =false;
            state.errorMessage = action.payload.message;
        })
    }
})

// export const {reducers } = productSlice.actions;
export default productSlice.reducer;