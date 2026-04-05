import React from "react";
import { Input, Textarea, FileInput } from "../forms/FormInputs";

export const FormRenderer = React.memo(({ config, register, errors }) => {
  const renderField = (field) => {
    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            key={field.name}
            label={field.label}
            name={field.name}
            register={register}
            validation={field.validation}
            errors={errors}
          />
        );

      case "file":
        return (
          <FileInput
            key={field.name}
            label={field.label}
            name={field.name}
            register={register}
            errors={errors}
          />
        );

      default:
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
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {config.map(renderField)}
    </div>
  );
});