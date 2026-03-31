import React from "react";

export const Input = React.memo(
  ({ label, register, name, type = "text", errors, validation }) => {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>

        <input
          type={type}
          step="any"
          {...register(name, validation)}
          className={`w-full px-3 py-2 border rounded-lg outline-none transition 
            focus:ring-2 focus:ring-blue-400 
            ${errors[name] ? "border-red-500" : "border-gray-300"}
          `}
        />

        {errors[name] && (
          <p className="text-red-500 text-xs">
            {errors[name].message}
          </p>
        )}
      </div>
    );
  }
);