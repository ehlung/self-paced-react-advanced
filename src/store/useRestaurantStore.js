import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_URL = "http://localhost:3000/restaurants";

const useRestaurantStore = create(
  persist(
    (set, get) => ({
      // state
      restaurantList: [],
      category: "전체",
      selected: null,

      // actions
      setCategory: (category) => set({ category }),

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
    }
  )
);

export default useRestaurantStore;
