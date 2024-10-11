import React, { useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";
import FormCheckField from "@/components/forms/FormCheckField";
import EnhancedCheck from "@/components/forms/EnhancedCheck";

const ItemStatusField: React.FC = () => {
  const name = "status";

  const { control } = useFormContext();
  const { field } = useController({
    control,
    name,
  });
  const { value } = field;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      field.onChange(event);
    },
    [field],
  );

  return (
    <FormCheckField name={name} legend="Status" grid>
      {[
        {
          value: "active",
          label: "Aktywny",
        },
        {
          value: "hidden",
          label: "Ukryty",
        },
      ].map((status) => (
        <EnhancedCheck
          value={status.value}
          key={status.value}
          label={status.label}
          name={name}
          type="radio"
          checked={value === status.value}
          onChange={handleChange}
        />
      ))}
    </FormCheckField>
  );
};

export default ItemStatusField;
