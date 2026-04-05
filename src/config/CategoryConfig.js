export const CategoryConfigForm = [
    { name: "name", label: "Category Name", type: "text", validation: { required: "Category name is required" } },
    { name: "slug", label: "Slug", type: "text", validation: { required: "Slug is required" } },
    { name: "productCount", label: "Product Count", type: "number" },
    { name: "image", label: "Category Image", type: "file" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "parentCategory", label: "Parent Category", type: "select", options: [] },
    { name: "metaTitle", label: "Meta Title", type: "text" },
    { name: "metaDescription", label: "Meta Description", type: "textarea" },
    { name: "sortOrder", label: "Sort Order", type: "number" },
];