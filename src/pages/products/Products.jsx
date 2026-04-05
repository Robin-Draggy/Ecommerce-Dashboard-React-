import React, { useEffect, useState } from "react";
import { DataTable } from "../../components/data-table/DataTable";
import {
  formatCurrency,
  getStatusBadge,
} from "../../utils/formatters";
import { TableActions } from "../../components/table/TableActions";
import { Button } from "../../components/ui/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts } from "../../store/features/products/ProductSelectors";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../store/features/products/ProductSlice";
import { Modal } from "../../components/ui/Modal";
import { ProductForm } from "../../components/forms/ProductForm";
import { DeleteConfirmationModal } from "../../components/ui/DeleteConfirmationModal";
import { ProductConfigForm } from "../../config/ProductConfig";

export const Products = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Edit product
  const handleEdit = (row) => {
    setSelectedProduct(row);
    setIsOpen(true);
  };

  // Delete click (opens modal)
  const handleDelete = (row) => {
    setSelectedProduct(row);
    setDeleteModalOpen(true);
  };

  // Confirm deletion
  const handleDeleteConfirm = () => {
    if (selectedProduct) {
      dispatch(deleteProduct(selectedProduct.id));
      setSelectedProduct(null);
    }
  };

  const handleView = (row) => {
    console.log(row);
  };

  const AddProducts = () => {
    setSelectedProduct(null);
    setIsOpen(true);
  };

  const onClose = () => setIsOpen(false);

  const isEdit = Boolean(selectedProduct);

  const handleProductSubmit = (data) => {
    const payload = {
      ...data,
      price: parseFloat(data.price) || 0,
      stock: Number(data.stock) || 0,
    };

    if (isEdit) {
      dispatch(updateProduct({ id: selectedProduct.id, data: payload }));
    } else {
      dispatch(createProduct(payload));
    }

    onClose();
  };

  const columns = [
    {
      key: "images",
      label: "Image",
      render: (row) => {
        const imageUrl = row.images?.[0];
        return (
          <img
            src={imageUrl || "https://placehold.co/40x40"}
            alt={row.name}
            className="w-10 h-10 rounded object-cover border border-cl"
            onError={(e) => (e.target.src = "https://placehold.co/40x40")}
          />
        );
      },
    },
    { key: "name", label: "Product Name" },
    { key: "sku", label: "SKU" },
    {
      key: "price",
      label: "Price",
      render: (row) => formatCurrency(row.price),
    },
    {
      key: "cost",
      label: "Cost",
      render: (row) => formatCurrency(row.cost),
    },
    { key: "stock", label: "Stock" },
    { key: "category", label: "Category" },
    { key: "brand", label: "Brand" },
    {
      key: "rating",
      label: "Rating",
      render: (row) => (
        <div className="flex items-center gap-1">
          <span>{row.rating}</span>
          <span className="text-yellow-500">★</span>
          <span className="text-xs text-cl-muted">({row.reviews})</span>
        </div>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (row) => (
        <span
          className={
            row.isActive ? getStatusBadge("active") : getStatusBadge("inactive")
          }
        >
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Products</h1>
        <Button onClick={AddProducts} label="Add Products" />
      </div>

      <DataTable data={products} columns={columns} />

      {/* Product Form Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Product">
        <ProductForm
          config={ProductConfigForm}
          initialData={selectedProduct}
          onSubmit={handleProductSubmit}
          onClose={onClose}
          submitLabel={isEdit ? "Update Product" : "Create Product"}
        />
      </Modal>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        entityName="product"
      />
    </div>
  );
};
