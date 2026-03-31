import React from "react";
import { Input } from "./Input";

export const FormRenderer = React.memo(({ config, register, errors }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {config.map((field) => {
        // TEXTAREA
        if (field.type === "textarea") {
          return (
            <div key={field.name} className="md:col-span-2 flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">{field.label}</label>
              <textarea
                {...register(field.name, field.validation)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400
                  ${errors[field.name] ? "border-red-500" : "border-gray-300"}`}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-xs">{errors[field.name].message}</p>
              )}
            </div>
          );
        }

        // FILE INPUT
        if (field.type === "file") {
          return (
            <div key={field.name} className="md:col-span-2 flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">{field.label}</label>
              <input
                type="file"
                {...register(field.name)}
                className="w-full border border-gray-300 rounded-lg p-2 file:mr-4 file:py-1 file:px-3 file:border-0 file:bg-blue-500 file:text-white file:rounded-md"
              />
              {errors[field.name] && (
                <p className="text-red-500 text-xs">{errors[field.name].message}</p>
              )}
            </div>
          );
        }

        // DEFAULT INPUT
        return (
          <Input
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            register={register}
            validation={field.validation}
            errors={errors}
          />
        );
      })}
    </div>
  );
});