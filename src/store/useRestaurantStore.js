import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_URL = "http://localhost:3000/restaurants";

const CATEGORY_OPTIONS = [
  "전체",
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타",
];
const normalizeCategory = (value) => {
  if (typeof value !== "string") return "전체";
  return CATEGORY_OPTIONS.includes(value) ? value : "전체";
};

const useRestaurantStore = create(
  persist(
    (set, get) => ({
      // state
      restaurantList: [],
      category: "전체",
      selected: null,

      // actions
      setCategory: (category) => set({ category: normalizeCategory(category) }),

      selectRestaurant: (restaurant) => set({ selected: restaurant }),
      deselectRestaurant: () => set({ selected: null }),

      fetchRestaurants: async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        set({ restaurantList: data });
      },

      addRestaurant: async ({ name, description, category }) => {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, description, category }),
        });

        await get().fetchRestaurants();
      },
    }),
    {
      // 새로고침 후에도 category만 유지하도록 제한
      name: "restaurant-store",
      partialize: (state) => ({ category: state.category }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        // 로컬스토리지 값은 신뢰하지 않고 도메인 검증 후 보정
        const safe = normalizeCategory(state.category);
        if (safe !== state.category) state.setCategory(safe);
      },
    }
  )
);

export default useRestaurantStore;
