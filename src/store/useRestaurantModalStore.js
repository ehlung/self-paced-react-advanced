import { create } from "zustand";

const useRestaurantModalStore = create((set) => ({
  // state
  isAddModalOpen: false,

  // actions
  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),
}));

export default useRestaurantModalStore;
