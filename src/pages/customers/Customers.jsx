import React, { useEffect, useState } from 'react'
import { DataTable } from '../../components/data-table/DataTable'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer } from '../../store/features/customers/CustomerSelectors'
import { getCustomers, deleteCustomer } from '../../store/features/customers/CustomerSlice'
import { formatCurrency, getStatusBadge, formatDate } from "../../utils/formatters"
import { TableActions } from '../../components/table/TableActions';
import { DeleteConfirmationModal } from '../../components/ui/DeleteConfirmationModal'



export const Customers = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);


  const dispatch = useDispatch();
  const customers = useSelector(selectCustomer);

  console.log("customers", customers)

  useEffect(() => {
    dispatch(getCustomers())
  }, [dispatch])

  const handleEdit = (row) => {
    console.log("edit", row)
  }

  const handleDelete = (row) => {
    setSelectedCustomer(row)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if(selectCustomer){
      dispatch(deleteCustomer(selectCustomer.id))
      setSelectedCustomer(null)
    }
  }

  const columns = [
    { key: 'id', label: 'Customer ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    {
        key: 'totalOrders',
        label: 'Total Orders',
        render: (row) => row.totalOrders,
    },
    {
        key: 'totalSpent',
        label: 'Total Spent',
        render: (row) => formatCurrency(row.totalSpent),
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
      <h1 className="text-2xl">Customers</h1>
      <DataTable data={customers} columns={columns} />

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        entityName='Customer'
      />
    </div>
  )
}