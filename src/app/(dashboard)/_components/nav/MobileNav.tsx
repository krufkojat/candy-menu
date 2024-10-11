import Drawer from "@/components/overlays/Drawer";
import DialogHeader from "@/components/overlays/DialogHeader";
import NavItems from "@/app/(dashboard)/_components/nav/NavItems";

interface MobileNavProps {
  menuOpen: {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
  };
}

const MobileNav = ({ menuOpen }: MobileNavProps) => {
  const { isOpen, closeModal } = menuOpen;

  return (
    <Drawer isOpen={isOpen} close={closeModal}>
      <DialogHeader title="Menu" close={closeModal} />

      <NavItems close={closeModal} />
    </Drawer>
  );
};

export default MobileNav;
