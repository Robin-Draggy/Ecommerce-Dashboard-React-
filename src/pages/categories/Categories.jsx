import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from '../../components/data-table/DataTable';
import { formatCurrency, getStatusBadge, formatDate } from "../../utils/formatters"
import { TableActions } from '../../components/table/TableActions';
import { selectedCategory } from '../../store/features/categories/CategorySelector';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../store/features/categories/CategoriesSlice'
import { Modal } from '../../components/ui/Modal'
import { ProductForm } from '../../components/forms/ProductForm'
import { Button } from '../../components/ui/Button/Button'
import { DeleteConfirmationModal } from '../../components/ui/DeleteConfirmationModal'
import { CategoryConfigForm } from '../../config/CategoryConfig'

export const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectCategory, setSelectCategory] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector(selectedCategory);

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const AddCategories = () => {
    setSelectCategory(null)
    setIsOpen(true)
  }

  const handleEdit = (row) => {
    setSelectCategory(row)
    setIsOpen(true)
  }

  const handleView = () => {
    console.log("view")
  }

  const handleDelete = (row) => {
    setSelectCategory(row)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if(selectCategory){
      dispatch(deleteCategory(selectCategory.id))
    }
  }

  const onClose = () => setIsOpen(false);

  const isEdit = Boolean(selectCategory)

  const handleCategorySubmit = (data) => {
    const payload = {
      ...data,
    }

    if(isEdit) {
      dispatch(updateCategory({id: selectCategory.id, data: payload}));
    }else{
      dispatch(createCategory(payload));
    }

    onClose();
  }

  const columns = [
    {
        key: 'image',
        label: 'Image',
        render: (row) => (
            <img
                src={row.image || 'https://placehold.co/40x40'}
                alt={row.name}
                className="w-10 h-10 rounded object-cover border border-cl"
                onError={(e) => (e.target.src = 'https://placehold.co/40x40')}
            />
        ),
    },
    { key: 'id', label: 'Category ID' },
    { key: 'name', label: 'Category Name' },
    { key: 'slug', label: 'Slug' },
    {
        key: 'productCount',
        label: 'Products',
        render: (row) => (
            <div className="flex items-center gap-1">
                <span>{row.productCount}</span>
                <span className="text-xs text-cl-muted">products</span>
            </div>
        ),
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
        <h1 className="text-2xl">Categories</h1>
        <Button onClick={AddCategories} label="Add Products" />
      </div>

      <DataTable data={categories} columns={columns} />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Categories">
        <ProductForm 
        config={CategoryConfigForm}
        initialData={selectCategory} 
        onClose={onClose}
        onSubmit={handleCategorySubmit}
        submitLabel={isEdit ? 'Update Category' : 'Create Category'}
        />
      </Modal>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        entityName="Category"
      />
    </div>
  )
}