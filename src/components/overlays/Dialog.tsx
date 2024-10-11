import {
  Dialog as HeadlessDialog,
  DialogBackdrop,
  DialogPanel as HeadlessDialogPanel,
} from "@headlessui/react";
import React from "react";
import { cva, VariantProps } from "class-variance-authority";

const dialog = cva(
  "w-full p-6 text-left shadow-lg transition-all sm:w-full sm:max-w-3xl sm:rounded-2xl sm:p-8",
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
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ intent, isOpen, close, children }) => (
  <HeadlessDialog
    open={isOpen}
    onClose={close}
    transition
    className="relative z-50 transition duration-100 ease-in data-[closed]:opacity-0"
  >
    <DialogBackdrop className="fixed inset-0 bg-gray-500/50 backdrop-blur-sm" />

    <div className="fixed inset-0 w-screen overflow-y-auto sm:p-4">
      <div className="flex min-h-full sm:items-center sm:justify-center">
        <HeadlessDialogPanel className={dialog({ intent })}>
          {children}
        </HeadlessDialogPanel>
      </div>
    </div>
  </HeadlessDialog>
);

export default Dialog;
