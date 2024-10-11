import { DialogTitle as HeadlessDialogTitle } from "@headlessui/react";
import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import CloseIcon from "@/components/icons/CloseIcon";

const dialogHeader = cva(
  "mb-7 flex w-full items-center justify-between gap-4 border-b pb-3",
  {
    variants: {
      intent: {
        light: ["border-slate-100", "text-slate-600"],
        dark: ["border-slate-700", "text-slate-200"],
      },
    },
    defaultVariants: {
      intent: "light",
    },
  },
);

interface DialogHeaderProps extends VariantProps<typeof dialogHeader> {
  title: string;
  close: () => void;
}

const DialogHeader: React.FC<DialogHeaderProps> = ({
  intent,
  title,
  close,
}) => (
  <div className={dialogHeader({ intent })}>
    <HeadlessDialogTitle className="text-xl font-medium">
      {title}
    </HeadlessDialogTitle>

    <button
      type="button"
      className="ml-auto h-fit cursor-pointer rounded-xl p-2 text-slate-400 transition-colors hover:text-slate-300 focus:outline-gray-100"
      onClick={close}
    >
      <CloseIcon />
    </button>
  </div>
);

export default DialogHeader;
