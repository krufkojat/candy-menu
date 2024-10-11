import {
  Dialog as HeadlessDialog,
  DialogPanel as HeadlessDialogPanel,
} from "@headlessui/react";
import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import Button from "@/components/buttons/Button";

const dialog = cva(
  "w-full p-6 shadow-lg max-w-xl transition-all sm:w-full sm:rounded-2xl sm:p-8",
  {
    variants: {
      intent: {
        light: ["bg-white"],
        dark: ["bg-slate-800"],
      },
    },
    defaultVariants: {
      intent: "light",
    },
  },
);

interface DialogProps extends VariantProps<typeof dialog> {
  isOpen: boolean;
  close: () => void;
  title: string;
  proceed: () => void;
  proceedLabel: string;
}

const Dialog: React.FC<DialogProps> = ({
  intent,
  isOpen,
  close,
  title,
  proceed,
  proceedLabel,
}) => (
  <HeadlessDialog
    open={isOpen}
    onClose={close}
    transition
    className="fixed inset-0 flex w-screen items-center justify-center bg-gray-500/50 p-0 backdrop-blur-sm transition duration-100 ease-in data-[closed]:opacity-0 sm:p-8 md:p-4"
  >
    <HeadlessDialogPanel className={dialog({ intent })}>
      <div className="flex flex-col justify-between">
        <div className="border-b border-slate-100 pb-5">
          <p className="mb-4 text-xl font-bold text-gray-800">{title}</p>

          <p className="font-semibold text-red-500 underline">
            Tej operacji nie można cofnąć.
          </p>
        </div>

        <div className="mt-5 flex w-full flex-col items-center justify-end gap-4 sm:flex-row">
          <Button onClick={close} intent="outline">
            Anuluj
          </Button>

          <Button onClick={proceed} intent="danger">
            {proceedLabel}
          </Button>
        </div>
      </div>
    </HeadlessDialogPanel>
  </HeadlessDialog>
);

export default Dialog;
