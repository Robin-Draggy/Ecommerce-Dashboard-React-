import { useForm } from 'react-hook-form'
import { FormRenderer } from '../ui/FormRenderer'

export const ProductForm = ({
  config,
  initialData,
  onSubmit,
  onClose,
  submitLabel = "Submit"
}) => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData || {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-[500px]">
      
      <div className="flex-1 overflow-y-auto">
        <FormRenderer config={config} register={register} errors={errors} />
      </div>

      <div className="flex justify-end gap-3 pt-3 border-t mt-2">
        <button type="button" onClick={onClose} className='px-3 py-2 rounded-lg border-1 border-gray-800 hover:scale-105 duration-300 transition-ease cursor-pointer'>
          Cancel
        </button>

        <button type="submit" className='px-3 py-2 text-white rounded-lg bg-blue-800 hover:scale-105 duration-300 transition-ease cursor-pointer'>
          {submitLabel}
        </button>
      </div>
    </form>
  );
};