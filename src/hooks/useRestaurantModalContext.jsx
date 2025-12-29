import useRestaurantModalStore from "../store/useRestaurantModalStore";

const useRestaurantModalContext = () => {
  const isAddModalOpen = useRestaurantModalStore((s) => s.isAddModalOpen);
  const openAddModal = useRestaurantModalStore((s) => s.openAddModal);
  const closeAddModal = useRestaurantModalStore((s) => s.closeAddModal);

  return {
    isAddModalOpen,
    openAddModal,
    closeAddModal,
  };
};

export default useRestaurantModalContext;
