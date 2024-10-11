import React from "react";
import { TagRenderer, TagRendererProps } from "react-tag-autocomplete";
import CloseIcon from "@/components/icons/CloseIcon";

const FormTagsFieldItem: TagRenderer = ({
  tag,
  onClick,
  title,
}: TagRendererProps) => (
  <div className="group inline-flex w-fit items-center gap-1.5 rounded-xl bg-gray-100 px-3 py-1 font-medium text-gray-400 transition-colors hover:bg-gray-200 peer-focus:ring peer-focus:ring-gray-500/20">
    {tag.label}

    <button
      type="button"
      title={title}
      onClick={onClick}
      className="ml-1 inline-flex items-center rounded-sm bg-transparent text-lg text-gray-400 transition-colors hover:text-gray-500"
    >
      <CloseIcon />
    </button>
  </div>
);

export default FormTagsFieldItem;
