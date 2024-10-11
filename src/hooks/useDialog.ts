import { useCallback, useMemo, useState } from "react";

const useDialog = () => {
  let [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return useMemo(
    () => ({
      isOpen,
      openModal,
      closeModal,
    }),
    [isOpen, openModal, closeModal],
  );
};

export default useDialog;
