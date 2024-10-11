import React from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

interface DrawerProps {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, close, children }) => (
  <Dialog
    open={isOpen}
    onClose={close}
    transition
    className="relative z-[55] transition duration-100 ease-in data-[closed]:opacity-0"
  >
    <DialogBackdrop className="fixed inset-0 bg-gray-500/50 backdrop-blur-sm" />

    <div className="fixed inset-0 overflow-y-auto">
      <div className="absolute inset-0 overflow-hidden">
        <div className="fixed inset-y-0 right-0 flex max-w-full">
          <DialogPanel className="w-screen max-w-xs bg-white p-6 text-left shadow-lg transition-all">
            {children}
          </DialogPanel>
        </div>
      </div>
    </div>
  </Dialog>
);

export default Drawer;
