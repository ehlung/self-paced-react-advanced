import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const CATEGORY_OPTIONS = [
  "전체",
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타",
];

const normalizeCategory = (value) =>
  CATEGORY_OPTIONS.includes(value) ? value : "전체";

const useRestaurantStore = create(
  persist(
    (set) => ({
      // client state만 관리
      category: "전체",
      selected: null,

      setCategory: (category) => set({ category: normalizeCategory(category) }),

      selectRestaurant: (restaurant) => set({ selected: restaurant }),
      deselectRestaurant: () => set({ selected: null }),
    }),
    {
      name: "restaurant-store",
      partialize: (state) => ({ category: state.category }),
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useRestaurantStore;
