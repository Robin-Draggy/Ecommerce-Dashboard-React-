import { createSelector } from '@reduxjs/toolkit'

export const selectedInventory = (state) => state.inventory.inventories;

export const inventorySelectorMemo = createSelector(
    [selectedInventory],
    (inventories) => inventories
)