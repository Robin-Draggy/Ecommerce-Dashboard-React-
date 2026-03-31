import { createSelector } from "@reduxjs/toolkit"

export const selectProducts = (state) => state.product.products;

export const selectProductMemo = createSelector(
    [selectProducts],
    (products) => products
);