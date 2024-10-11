import React from "react";
import Dialog from "@/components/overlays/Dialog";
import DialogHeader from "@/components/overlays/DialogHeader";
import Form from "@/app/(dashboard)/panel/_components/Form";

interface SettingsDialogProps {
  isOpen: boolean;
  close: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ isOpen, close }) => (
  <Dialog isOpen={isOpen} close={close}>
    <DialogHeader close={close} title="Zmień ustawienia" />

    <Form closeModal={close} />
  </Dialog>
);

export default SettingsDialog;
