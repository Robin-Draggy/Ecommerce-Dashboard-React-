import { createSelector } from '@reduxjs/toolkit'

export const selectOrders = (state) => state.order.orders;

export const selectOrderMemo = createSelector(
    [selectOrders],
    (orders) => orders
)