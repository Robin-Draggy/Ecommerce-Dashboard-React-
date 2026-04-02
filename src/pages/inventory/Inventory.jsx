import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataTable } from '../../components/data-table/DataTable'
import { formatDate, getStockStatusBadge } from '../../utils/formatters';
import { TableActions } from '../../components/table/TableActions';
import { selectedInventory } from '../../store/features/inventories/InventoriesSelector'
import { getInventories, deleteInventory } from '../../store/features/inventories/InventoriesSlice'
import { DeleteConfirmationModal } from '../../components/ui/DeleteConfirmationModal'

export const Inventory = () => {
    const [selectedInventories, setSelectedInventories] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const dispatch = useDispatch();
    const inventories = useSelector(selectedInventory)

    console.log("inventories", inventories)

    useEffect(() => {
        dispatch(getInventories())
    }, [dispatch])

    const handleEdit = (row) => {
        console.log(row)
    }

    const handleDelete = (row) => {
        setSelectedInventories(row)
        setDeleteModalOpen(true);
    }

    const handleDeleteConfirm = () => {
        if(selectedInventories){
            dispatch(deleteInventory(selectedInventories.id))
        }
    }

    const columns = [
        {
            key: 'productId',
            label: 'Product',
        },
        {
            key: 'warehouse',
            label: 'Warehouse',
        },
        {
            key: 'quantity',
            label: 'Stock',
            render: (row) => (
                <span className={getStockStatusBadge(row.quantity, row.lowStockThreshold)}>
                    {row.quantity}
                </span>
            ),
        },
        {
            key: 'lowStockThreshold',
            label: 'Low Stock Threshold',
            render: (row) => row.lowStockThreshold,
        },
        {
            key: 'lastRestocked',
            label: 'Last Restocked',
            render: (row) => formatDate(row.lastRestocked),
        },
        {
            key: 'status',
            label: 'Status',
            render: (row) => {
                const status = row.quantity === 0 ? 'out of stock' :
                    row.quantity < row.lowStockThreshold ? 'low stock' : 'in stock';
                const badgeClass = getStockStatusBadge(row.quantity, row.lowStockThreshold);
                return <span className={badgeClass}>{status}</span>;
            },
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (row) => (
                <TableActions
                    row={row}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ),
        },
    ];

    return (
        <div className="bg-cl-primary w-full min-h-screen rounded-lg p-2 space-y-4">
            <h1 className="text-2xl">Inventory</h1>
            <DataTable data={inventories} columns={columns} />

            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onSubmit={handleDeleteConfirm}
                entityName='Inventory'
            />
        </div>
    )
}