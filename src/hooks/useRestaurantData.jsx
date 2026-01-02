import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchRestaurants, createRestaurant } from "../api/restaurants";
import useRestaurantStore from "../store/useRestaurantStore";

const QUERY_KEY = ["restaurants"];

export default function useRestaurantData() {
  // client state
  const category = useRestaurantStore((s) => s.category);
  const selected = useRestaurantStore((s) => s.selected);
  const setCategory = useRestaurantStore((s) => s.setCategory);
  const selectRestaurant = useRestaurantStore((s) => s.selectRestaurant);
  const deselectRestaurant = useRestaurantStore((s) => s.deselectRestaurant);

  // server state
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchRestaurants,
  });

  const addRestaurantMutation = useMutation({
    mutationFn: createRestaurant,

    // Optimistic Update
    onMutate: async (newRestaurant) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });

      const previous = queryClient.getQueryData(QUERY_KEY);

      const optimisticItem = {
        id: `optimistic-${Date.now()}`,
        ...newRestaurant,
      };

      queryClient.setQueryData(QUERY_KEY, (old) => {
        const current = Array.isArray(old) ? old : [];
        return [optimisticItem, ...current];
      });

      return { previous };
    },

    onError: (err, newRestaurant, context) => {
      if (context?.previous) {
        queryClient.setQueryData(QUERY_KEY, context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });

  const filteredRestaurants =
    category === "전체" ? data : data.filter((r) => r.category === category);

  return {
    restaurantList: data,
    filteredRestaurants,
    category,
    selected,

    setCategory,
    selectRestaurant,
    deselectRestaurant,

    addRestaurant: addRestaurantMutation.mutateAsync,

    isLoading,
    isError,
    error,
  };
}
