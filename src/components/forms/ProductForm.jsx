import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createProduct, updateProduct } from "../../store/features/products/ProductSlice";
import { FormRenderer } from "../ui/FormRenderer";
import { ProductConfigForm } from "../../config/ProductConfig";

export const ProductForm = ({ initialData, onClose }) => {
  const dispatch = useDispatch();
  const isEdit = Boolean(initialData);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {},
  });

  const onSubmit = (data, e) => {
    e?.preventDefault(); // prevent native reload

    const payload = {
      ...data,
      price: parseFloat(data.price) || 0,
      cost: parseFloat(data.cost) || 0,
      rating: parseFloat(data.rating) || 0,
      stock: Number(data.stock) || 0,
      reviews: Number(data.reviews) || 0,
      isActive: true,
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };

    if (data.images?.length) {
      payload.images = [URL.createObjectURL(data.images[0])];
    } else {
      payload.images = initialData?.images || [];
    }

    if (isEdit) {
      dispatch(updateProduct({ id: initialData.id, data: payload }));
    } else {
      dispatch(createProduct(payload));
    }

    onClose(); // close modal
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
      {/* Scrollable Fields */}
      <div className="flex-1 overflow-y-auto">
        <FormRenderer config={ProductConfigForm} register={register} errors={errors} />
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3 pt-3 border-t mt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          {isEdit ? "Update Product" : "Create Product"}
        </button>
      </div>
    </form>
  );
};