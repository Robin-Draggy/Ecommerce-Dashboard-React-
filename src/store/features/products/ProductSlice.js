import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createProductAPI, deleteProductAPI, getProductsAPI, updateProductAPI } from "../../../api/ProductsApi";

export const getProducts = createAsyncThunk(
    "product/getProducts",
    async(params = {}, { rejectWithValue }) => {
        try{
            const response = await getProductsAPI();
            return response.data;
        }catch(error){
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const createProduct = createAsyncThunk(
    "product/createProduct",
    async(data, { rejectWithValue }) => {
        try{
            const response = await createProductAPI(data);
            return response.data;
        }catch(error){
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
export const updateProduct = createAsyncThunk(
    "product/updateProduct",
    async({ id, data }, { rejectWithValue }) => {
        try{
            const response = await updateProductAPI(id, data);
            return response.data;
        }catch(error){
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)
export const deleteProduct = createAsyncThunk(
    "product/deleteProduct",
    async(id, { rejectWithValue }) => {
        try{
            const response = await deleteProductAPI(id);
            return response.data;
        }catch(error){
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

const initialState = {
    loading: false,
    products: [],
    error: null
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.loading = false;
        })
        .addCase(createProduct.fulfilled, (state, action) => {
            state.products.unshift(action.payload);
            state.loading = false;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            const updatedProduct = action.payload;
          
            const index = state.products.findIndex(
              (product) => product.id === updatedProduct.id
            );
          
            if (index !== -1) {
              state.products[index] = updatedProduct;
            }
          })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.products = state.products.filter((product) => product.id != action.payload)
        })
    }
})

export default productSlice.reducer;