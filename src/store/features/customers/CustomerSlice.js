import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCustomersAPI, deleteCustomerAPI } from './CustomersAPI'


export const getCustomers = createAsyncThunk(
    'customer/getCustomers',
    async ( params = {}, {rejectWithValue}) => {
        try {
            const response = await getCustomersAPI();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)


export const deleteCustomer = createAsyncThunk(
    'customer/deleteCustomer',
    async ( id, {rejectWithValue}) => {
        try {
            const response = await deleteCustomerAPI(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

const initialState = {
    loading: false,
    customers: [],
    error: null
}

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCustomers.fulfilled, ( state, action )=> {
            state.customers = action.payload;
            state.loading = false;
        })
        .addCase(deleteCustomer.fulfilled, (state, action) => {
            state.customers = state.customers.filter((customer) => customer.id != action.payload)
            state.loading = false;
        })
    }
})


export default customerSlice.reducer;











