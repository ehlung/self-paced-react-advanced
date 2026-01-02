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
    onSuccess: () => {
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
