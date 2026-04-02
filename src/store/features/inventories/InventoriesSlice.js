import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getInventoriesAPI, deleteInventoryAPI } from './InventoriesApi'

export const getInventories = createAsyncThunk(
    'inventory/getInventories',
    async (params = {}, {rejectWithValue}) => {
        try {
            const response = await getInventoriesAPI();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

export const deleteInventory = createAsyncThunk(
    'inventory/deleteInventory',
    async (id, {rejectWithValue}) => {
        try {
            const response = await deleteInventoryAPI(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

const initialState = {
    loading: false,
    inventories: [],
    error: null
}

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getInventories.fulfilled, (state, action) => {
            state.inventories = action.payload;
            state.loading = false;
        })
        .addCase(deleteInventory.fulfilled, (state, action) => {
            state.inventories = state.inventories.filter((inventory) => inventory.id != action.payload)
            state.loading = false;
        })
    }
})

export default inventorySlice.reducer;