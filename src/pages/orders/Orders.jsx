import React, { useEffect, useState } from 'react'
import { DataTable } from '../../components/data-table/DataTable';
import { formatCurrency, getStatusBadge, formatDate } from "../../utils/formatters"
import { TableActions } from '../../components/table/TableActions';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrders } from '../../store/features/orders/OrderSelectors';
import { getOrders, deleteOrder } from '../../store/features/orders/OrderSlice'
import { DeleteConfirmationModal } from '../../components/ui/DeleteConfirmationModal'

export const Orders = () => {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);

    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch])

    const handleEdit = (row) => {
        console.log(row)
    }

    const handleDelete = (row) => {
        setDeleteModalOpen(true)
        setSelectedOrder(row)
    }

    const handleDeleteConfirm = () => {
        if(selectedOrder){
            dispatch(deleteOrder(selectedOrder.id))
            setSelectedOrder(null)
        }
    }

    const columns = [
        { key: 'id', label: 'Order ID' },
        { key: 'customerName', label: 'Customer' },
        { key: 'customerEmail', label: 'Email' },
        {
            key: 'items',
            label: 'Items',
            render: (row) => {
                const itemCount = row.items.length;
                const firstItem = row.items[0]?.productName || '';
                return itemCount === 1 ? firstItem : `${firstItem} +${itemCount - 1}`;
            },
        },
        {
            key: 'totalAmount',
            label: 'Total',
            render: (row) => formatCurrency(row.totalAmount),
        },
        {
            key: 'status',
            label: 'Status',
            render: (row) => (
                <span className={getStatusBadge(row.status)}>
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </span>
            ),
        },
        { key: 'paymentMethod', label: 'Payment' },
        {
            key: 'orderDate',
            label: 'Order Date',
            render: (row) => formatDate(row.orderDate),
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
            <h1 className="text-2xl">Orders</h1>
            <DataTable data={orders} columns={columns} />

            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                entityName="Order"
            />
        </div>
    )
}
