import useRestaurantStore from "../store/useRestaurantStore";

const useRestaurantDataContext = () => {
  const restaurantList = useRestaurantStore((s) => s.restaurantList);
  const category = useRestaurantStore((s) => s.category);
  const selected = useRestaurantStore((s) => s.selected);

  const setCategory = useRestaurantStore((s) => s.setCategory);
  const selectRestaurant = useRestaurantStore((s) => s.selectRestaurant);
  const deselectRestaurant = useRestaurantStore((s) => s.deselectRestaurant);
  const addRestaurant = useRestaurantStore((s) => s.addRestaurant);
  const fetchRestaurants = useRestaurantStore((s) => s.fetchRestaurants);

  const filteredRestaurants =
    category === "전체"
      ? restaurantList
      : restaurantList.filter((r) => r.category === category);

  return {
    restaurantList,
    category,
    filteredRestaurants,
    selected,
    setCategory,
    selectRestaurant,
    deselectRestaurant,
    addRestaurant,
    fetchRestaurants,
  };
};

export default useRestaurantDataContext;
