import React, { useCallback, useEffect, useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import Label from "@/components/forms/Label";
import FormError from "@/components/forms/FormError";
import {
  ReactTags,
  ReactTagsAPI,
  TagSelected,
  TagSuggestion,
} from "react-tag-autocomplete";
import FormTagsFieldItem from "@/components/forms/FormTagsFieldItem";
import clsx from "clsx";

interface FormTagsFieldProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  suggestions: TagSuggestion[];
}

const FormTagsField: React.FC<FormTagsFieldProps> = ({
  name,
  label,
  isRequired,
  placeholder,
  suggestions,
}) => {
  const reactTags = useRef<ReactTagsAPI>(null);
  const [errorMessage, setErrorMessage] = useState<string>();
  const { control } = useFormContext();

  const {
    field,
    fieldState: { error, invalid },
  } = useController({
    control,
    name,
  });

  const [value, setValue] = useState(field.value || []);

  const handleValidate = (newTag: string) =>
    value.every((tag: TagSelected) => tag.label !== newTag.trim());

  const handleAddition = useCallback(
    (newTag: TagSelected) => {
      const valueCopy = [...value, newTag];

      field.onChange(valueCopy);
      setValue(valueCopy);
      field.onBlur();
    },
    [value, field],
  );

  const handleDelete = useCallback(
    (tagIndex: number) => {
      const valueCopy = value.filter(
        (_: string, index: number) => index !== tagIndex,
      );

      field.onChange(valueCopy);
      setValue(valueCopy);
    },
    [value, field],
  );

  const suggestionsTransform = useCallback(
    (query: string) =>
      suggestions.filter(
        (suggestion) =>
          value.every((tag: TagSelected) => tag.label !== suggestion.label) &&
          suggestion.label.toLowerCase().includes(query.toLowerCase()),
      ),
    [value, suggestions],
  );

  useEffect(() => {
    setValue(field.value);
  }, [field.value]);

  useEffect(() => {
    if (!error) {
      setErrorMessage(undefined);

      return;
    }

    setErrorMessage(
      Array.isArray(error) && error.length > 0
        ? error.find((e) => e?.message).message
        : error.message,
    );
  }, [error]);

  return (
    <div>
      {label && (
        <Label label={label} fieldName={name} isRequired={isRequired} />
      )}

      <div
        className={clsx(
          "space-y-3 rounded-xl bg-slate-50/75 p-4",
          invalid && "ring-2 ring-red-200",
        )}
      >
        <ReactTags
          labelText=""
          newOptionText='Dodaj "%value%"'
          ref={reactTags}
          suggestions={suggestions}
          placeholderText={placeholder}
          selected={value}
          onDelete={handleDelete}
          onAdd={handleAddition}
          onValidate={handleValidate}
          allowNew
          allowResize={false}
          renderTag={FormTagsFieldItem}
          onInput={(v) => {
            if (v.length > 0 && reactTags.current) {
              reactTags.current.listBox.expand();
            }
          }}
          suggestionsTransform={suggestionsTransform}
          activateFirstOption={!suggestions.length}
        />
      </div>

      {invalid && errorMessage && <FormError message={errorMessage} />}
    </div>
  );
};

export default FormTagsField;
