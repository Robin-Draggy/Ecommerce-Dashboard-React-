import React from "react";
import { baseInputClass, errorClass, normalClass } from "../../utils/formStyles";

export const Input = React.memo(
  ({ label, name, type = "text", register, validation, errors }) => {
    const hasError = !!errors[name];

    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>

        <input
          type={type}
          {...register(name, validation)}
          className={`${baseInputClass} ${
            hasError ? errorClass : normalClass
          }`}
        />

        {hasError && (
          <p className="text-red-500 text-xs">
            {errors[name].message}
          </p>
        )}
      </div>
    );
  }
);

export const Textarea = React.memo(
  ({ label, name, register, validation, errors }) => {
    const hasError = !!errors[name];

    return (
      <div className="md:col-span-2 flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>

        <textarea
          rows={4}
          {...register(name, validation)}
          className={`${baseInputClass} ${
            hasError ? errorClass : normalClass
          }`}
        />

        {hasError && (
          <p className="text-red-500 text-xs">
            {errors[name].message}
          </p>
        )}
      </div>
    );
  }
);


export const FileInput = React.memo(
  ({ label, name, register, errors }) => {
    const hasError = !!errors[name];

    return (
      <div className="md:col-span-2 flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>

        <input
          type="file"
          {...register(name)}
          className={`${baseInputClass} ${
            hasError ? errorClass : normalClass
          }
          file:mr-4 file:py-1 file:px-3
          file:border-0 file:bg-blue-600 file:text-white
          file:rounded-md file:cursor-pointer
          hover:file:bg-blue-700`}
        />

        {hasError && (
          <p className="text-red-500 text-xs">
            {errors[name].message}
          </p>
        )}
      </div>
    );
  }
);