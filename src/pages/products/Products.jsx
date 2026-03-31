import React, { useEffect } from 'react'
import { DataTable } from "../../components/data-table/DataTable"
import { formatCurrency, getStatusBadge, formatDate } from "../../utils/formatters"
import { TableActions } from "../../components/table/TableActions"
import { Button } from '../../components/ui/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { selectProducts } from '../../store/features/products/ProductSelectors'
import { getProducts } from '../../store/features/products/ProductSlice'

export const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
  
  console.log("products", products)

  const handleEdit = (row) => {
    console.log(row)
  }

  const handleDelete = (row) => {
    console.log(row.id)
  }

  const handleView = (row) => {
    console.log(row)
  }

  const AddProducts = () => {
    console.log("product added")
  }

  const columns = [
    {
      key: 'images',
      label: 'Image',
      render: (row) => {
        const imageUrl = row.images?.[0]
        return (
          <img
            src={imageUrl}
            alt={row.name}
            className="w-10 h-10 rounded object-cover border border-cl"
            onError={(e) => (e.target.src = 'https://placehold.co/40x40')}
          />
        );
      },
    },
    { key: 'name', label: 'Product Name' },
    { key: 'sku', label: 'SKU' },
    {
      key: 'price',
      label: 'Price',
      render: (row) => formatCurrency(row.price),
    },
    {
      key: 'cost',
      label: 'Cost',
      render: (row) => formatCurrency(row.cost),
    },
    { key: 'stock', label: 'Stock' },
    { key: 'category', label: 'Category' },
    { key: 'brand', label: 'Brand' },
    {
      key: 'rating',
      label: 'Rating',
      render: (row) => (
        <div className="flex items-center gap-1">
          <span>{row.rating}</span>
          <span className="text-yellow-500">★</span>
          <span className="text-xs text-cl-muted">({row.reviews})</span>
        </div>
      ),
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (row) => (
        <span className={row.isActive ? getStatusBadge('active') : getStatusBadge('inactive')}>
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (row) => formatDate(row.createdAt),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <TableActions
          row={row}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  return (
    <div className="bg-cl-primary w-full min-h-screen rounded-lg p-2 space-y-4">
      <div className='flex items-center justify-between'>
        <h1 className="text-2xl">Products</h1>
        <Button onClick={AddProducts} label="Add Products" />
      </div>
      <DataTable data={products} columns={columns} />
    </div>
  )
}
