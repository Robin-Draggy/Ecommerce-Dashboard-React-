export const ProductConfigForm = [
    { name: "name", label: "Product Name", type: "text", validation: { required: "Required" } },
    { name: "price", label: "Price", type: "number", validation: { required: "Required" } },
    { name: "cost", label: "Cost", type: "number", validation: { required: "Required" } },
    { name: "stock", label: "Stock", type: "number", validation: { required: "Required" } },
    { name: "brand", label: "Brand", type: "text", validation: { required: "Required" } },
    {
        name: "category",
        label: "Category",
        type: "text",
        validation: { required: "Category is required" },
      },
    { name: "sku", label: "SKU", type: "text", validation: { required: "Required" } },
    { name: "description", label: "Description", type: "textarea", validation: { required: "Required" } },
    { name: "images", label: "Images", type: "file" },
    { name: "rating", label: "Rating", type: "number" },
    { name: "reviews", label: "Reviews", type: "number" },
  ];