import React from 'react'
import { DataTable } from '../../components/data-table/DataTable';
import { formatCurrency, getStatusBadge, formatDate } from "../../utils/formatters"
import { TableActions } from '../../components/table/TableActions';

export const Orders = () => {

    const handleEdit = (row) => {
        console.log(row)
    }

    const handleDelete = (row) => {
        console.log(row.id)
    }

    const data = [
        {
            id: '1001',
            customerId: 'c001',
            customerName: 'John Smith',
            customerEmail: 'john@example.com',
            items: [
                { productId: '1', productName: 'Wireless Headphones', quantity: 1, price: 299.99 }
            ],
            totalAmount: 299.99,
            status: 'delivered',
            paymentMethod: 'credit_card',
            shippingAddress: '123 Main St, New York, NY 10001',
            orderDate: '2024-03-01T09:15:00Z',
            deliveryDate: '2024-03-05T14:30:00Z'
        },
        {
            id: '1002',
            customerId: 'c002',
            customerName: 'Jane Doe',
            customerEmail: 'jane@example.com',
            items: [
                { productId: '2', productName: 'Laptop', quantity: 1, price: 1299.99 },
                { productId: '3', productName: 'Mouse', quantity: 2, price: 25.99 }
            ],
            totalAmount: 1351.97,
            status: 'processing',
            paymentMethod: 'paypal',
            shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
            orderDate: '2024-03-10T11:20:00Z',
            deliveryDate: null
        },
        {
            id: '1003',
            customerId: 'c003',
            customerName: 'Bob Johnson',
            customerEmail: 'bob@example.com',
            items: [
                { productId: '4', productName: 'Desk Chair', quantity: 1, price: 249.99 },
                { productId: '5', productName: 'Desk Lamp', quantity: 1, price: 45.99 }
            ],
            totalAmount: 295.98,
            status: 'shipped',
            paymentMethod: 'credit_card',
            shippingAddress: '789 Pine St, Chicago, IL 60601',
            orderDate: '2024-03-12T15:45:00Z',
            deliveryDate: null
        }
    ];

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
            <DataTable data={data} columns={columns} />
        </div>
    )
}
