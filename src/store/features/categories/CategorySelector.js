import { createSelector } from '@reduxjs/toolkit'

export const selectedCategory = (state) => state.category.categories;

export const selectedCategoryMemo = createSelector(
    [selectedCategory],
    (categories) => categories
)