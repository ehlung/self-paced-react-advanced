import { createContext, useCallback, useEffect, useState } from "react";

const API_URL = "http://localhost:3000/restaurants";

const RestaurantDataContext = createContext(null);

export const RestaurantDataProvider = ({ children }) => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [category, setCategory] = useState("전체");
  const [selected, setSelected] = useState(null);

  const fetchRestaurants = useCallback(async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setRestaurantList(data);
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const filteredRestaurants =
    category === "전체"
      ? restaurantList
      : restaurantList.filter((restaurant) => restaurant.category === category);

  const selectRestaurant = (restaurant) => setSelected(restaurant);
  const deselectRestaurant = () => setSelected(null);

  const addRestaurant = async ({ name, description, category }) => {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, category }),
    });

    await fetchRestaurants();
  };

  const value = {
    restaurantList,
    category,
    filteredRestaurants,
    selected,
    setCategory,
    selectRestaurant,
    deselectRestaurant,
    addRestaurant,
  };

  return (
    <RestaurantDataContext.Provider value={value}>
      {children}
    </RestaurantDataContext.Provider>
  );
};

export default RestaurantDataContext;
