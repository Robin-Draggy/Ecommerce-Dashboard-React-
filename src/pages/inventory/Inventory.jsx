import React from 'react'
import { DataTable } from '../../components/data-table/DataTable'
import { formatDate, getStockStatusBadge } from '../../utils/formatters';
import { TableActions } from '../../components/table/TableActions';

export const Inventory = () => {

    const handleEdit = (row) => {
        console.log(row)
    }

    const handleDelete = (row) => {
        console.log(row.id)
    }

    const data = [
        {
            "productId": "1",
            "warehouse": "Main Warehouse",
            "quantity": 45,
            "lowStockThreshold": 10,
            "lastRestocked": "2024-03-01T11:00:00Z"
        },
        {
            "productId": "2",
            "warehouse": "North Warehouse",
            "quantity": 200,
            "lowStockThreshold": 25,
            "lastRestocked": "2024-04-12T09:30:00Z"
        },
        {
            "productId": "3",
            "warehouse": "South Warehouse",
            "quantity": 150,
            "lowStockThreshold": 15,
            "lastRestocked": "2024-05-20T14:15:00Z"
        },
        {
            "productId": "4",
            "warehouse": "East Warehouse",
            "quantity": 80,
            "lowStockThreshold": 12,
            "lastRestocked": "2024-06-08T10:45:00Z"
        },
        {
            "productId": "5",
            "warehouse": "West Warehouse",
            "quantity": 12,
            "lowStockThreshold": 10,
            "lastRestocked": "2024-07-01T08:20:00Z"
        },
        {
            "productId": "6",
            "warehouse": "Main Warehouse",
            "quantity": 95,
            "lowStockThreshold": 20,
            "lastRestocked": "2024-08-17T13:10:00Z"
        },
        {
            "productId": "7",
            "warehouse": "North Warehouse",
            "quantity": 300,
            "lowStockThreshold": 30,
            "lastRestocked": "2024-09-05T16:40:00Z"
        },
        {
            "productId": "8",
            "warehouse": "South Warehouse",
            "quantity": 60,
            "lowStockThreshold": 8,
            "lastRestocked": "2024-10-22T11:55:00Z"
        },
        {
            "productId": "9",
            "warehouse": "East Warehouse",
            "quantity": 110,
            "lowStockThreshold": 15,
            "lastRestocked": "2024-11-14T09:05:00Z"
        },
        {
            "productId": "10",
            "warehouse": "West Warehouse",
            "quantity": 75,
            "lowStockThreshold": 10,
            "lastRestocked": "2024-12-03T12:30:00Z"
        },
        {
            "productId": "11",
            "warehouse": "Main Warehouse",
            "quantity": 55,
            "lowStockThreshold": 10,
            "lastRestocked": "2025-01-19T14:25:00Z"
        },
        {
            "productId": "12",
            "warehouse": "North Warehouse",
            "quantity": 30,
            "lowStockThreshold": 5,
            "lastRestocked": "2025-02-07T10:15:00Z"
        },
        {
            "productId": "13",
            "warehouse": "South Warehouse",
            "quantity": 140,
            "lowStockThreshold": 20,
            "lastRestocked": "2025-03-28T15:50:00Z"
        },
        {
            "productId": "14",
            "warehouse": "East Warehouse",
            "quantity": 85,
            "lowStockThreshold": 12,
            "lastRestocked": "2025-04-16T09:35:00Z"
        },
        {
            "productId": "15",
            "warehouse": "West Warehouse",
            "quantity": 210,
            "lowStockThreshold": 25,
            "lastRestocked": "2025-05-24T13:20:00Z"
        },
        {
            "productId": "16",
            "warehouse": "Main Warehouse",
            "quantity": 120,
            "lowStockThreshold": 15,
            "lastRestocked": "2025-06-11T16:00:00Z"
        },
        {
            "productId": "17",
            "warehouse": "North Warehouse",
            "quantity": 180,
            "lowStockThreshold": 20,
            "lastRestocked": "2025-07-09T11:40:00Z"
        },
        {
            "productId": "18",
            "warehouse": "South Warehouse",
            "quantity": 250,
            "lowStockThreshold": 30,
            "lastRestocked": "2025-08-21T10:10:00Z"
        },
        {
            "productId": "19",
            "warehouse": "East Warehouse",
            "quantity": 40,
            "lowStockThreshold": 8,
            "lastRestocked": "2025-09-13T14:55:00Z"
        },
        {
            "productId": "20",
            "warehouse": "West Warehouse",
            "quantity": 35,
            "lowStockThreshold": 5,
            "lastRestocked": "2025-10-02T12:05:00Z"
        }
    ]

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
            <DataTable data={data} columns={columns} />
        </div>
    )
}