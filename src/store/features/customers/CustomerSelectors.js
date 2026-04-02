import { createSelector } from '@reduxjs/toolkit'

export const selectCustomer = (state) => state.customer.customers;

export const selectCustomerMemo = createSelector(
    [selectCustomer],
    (customers) => customers
)