import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCategoriesAPI, createCategoryAPI, updateCategoryAPI, deleteCategoryAPI } from './CategoriesApi'

export const getCategories = createAsyncThunk(
    'category/getCategories',
    async (params = {}, {rejectWithValue}) => {
        try {
            const response = await getCategoriesAPI();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const createCategory = createAsyncThunk(
    'category/createCategory',
    async ( data, {rejectWithValue}) => {
        try {
            const response = await createCategoryAPI(data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const updateCategory = createAsyncThunk(
    'category/updateCategory',
    async({id, data}, {rejectWithValue}) => {
        try {
            const response = await updateCategoryAPI(id, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.respone?.data || error.message)
        }
    }
)

export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (id, {rejectWithValue}) => {
        try {
            const response = await deleteCategoryAPI(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

const initialState = {
    loading: false,
    categories: [],
    error: null
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
            state.loading = false;
        })
        .addCase(createCategory.fulfilled, (state, action) => {
            state.categories.unshift(action.payload)
            state.loading = false;
        })
        .addCase(updateCategory.fulfilled, (state, action) => {
            const updatedCategory = action.payload;

            const Index = state.categories.findIndex(
                (category) => category.id === updateCategory.id
            )

            if(Index != -1){
                state.categories[Index] = updatedCategory
            }
        })
        .addCase(deleteCategory.fulfilled, (state, action) => {
            state.categories = state.categories.filter((category) => category.id != action.payload)
        })
    }
})

export default categorySlice.reducer;