import { createContext } from "react";
import useModal from "../hooks/useModal";

const RestaurantModalContext = createContext(null);

export const RestaurantModalProvider = ({ children }) => {
  const {
    isOpen: isAddModalOpen,
    open: openAddModal,
    close: closeAddModal,
  } = useModal(false);

  const value = {
    isAddModalOpen,
    openAddModal,
    closeAddModal,
  };

  return (
    <RestaurantModalContext.Provider value={value}>
      {children}
    </RestaurantModalContext.Provider>
  );
};

export default RestaurantModalContext;
