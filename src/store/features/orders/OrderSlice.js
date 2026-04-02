import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getOrdersAPI, deleteOrderAPI } from './OrdersApi'

export const getOrders = createAsyncThunk(
    'order/getOrders',
    async (params = {}, {rejectWithValue}) => {
        try{
            const response = await getOrdersAPI();
            return response.data;
    }catch(error){
            return rejectWithValue(error.response?.data || error.message)
    }
}
)

export const deleteOrder = createAsyncThunk(
    'order/deleteOrder',
    async(id, {rejectWithValue}) => {
        try {
            const response = await deleteOrderAPI(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

const initialState = {
    loading: false,
    orders: [],
    errors: null
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getOrders.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.loading = false;
        })
        .addCase(deleteOrder.fulfilled, (state, action) => {
            state.orders = state.orders.filter((order) => order.id != action.payload);
            state.loading = false;
        })
    }
})

export default orderSlice.reducer;