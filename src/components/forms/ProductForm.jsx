import { FormRenderer } from "../ui/FormRenderer";
import { useForm } from "react-hook-form"

export const ProductForm = ({
  config,
  initialData,
  onSubmit,
  onClose,
  submitLabel = "Submit",
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialData || {},
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col h-[500px]"
    >
      {/* Form Content */}
      <div className="flex-1 overflow-y-auto">
        <FormRenderer
          config={config}
          register={register}
          errors={errors}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-3 border-t mt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-gray-300 hover:scale-105 duration-300 transition cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-white rounded-lg bg-blue-600 hover:scale-105 duration-300 transition disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Submitting..." : submitLabel}
        </button>
      </div>
    </form>
  );
};