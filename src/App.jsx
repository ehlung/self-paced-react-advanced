import { useCallback, useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";

import useModal from "./hooks/useModal";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetailModal from "./components/RestaurantDetailModal";
import AddRestaurantModal from "./components/AddRestaurantModal";

const API_URL = "http://localhost:3000/restaurants";

function App() {
  const [restaurantList, setRestaurantList] = useState([]);
  const [category, setCategory] = useState("전체");

  const filteredRestaurants =
    category === "전체"
      ? restaurantList
      : restaurantList.filter((restaurant) => restaurant.category === category);

  const [selected, setSelected] = useState(null);
  const handleSelectRestaurant = (restaurant) => setSelected(restaurant);
  const handleDeselectRestaurant = () => setSelected(null);

  const {
    isOpen: isAddModalOpen,
    open: handleOpenAddModal,
    close: handleCloseAddModal,
  } = useModal(false);

  const fetchRestaurants = useCallback(async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setRestaurantList(data);
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const handleAddRestaurant = async ({ name, description, category }) => {
    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, category }),
    });

    handleCloseAddModal();
    await fetchRestaurants();
  };

  return (
    <>
      <Header onOpenAddModal={handleOpenAddModal} />
      <main>
        <FilterContainer>
          <CategoryFilter
            id="main-category-filter"
            label="음식점 카테고리 필터"
            category={category}
            onChangeCategory={setCategory}
          />
        </FilterContainer>
        <ListContainer>
          <RestaurantList
            restaurants={filteredRestaurants}
            onSelect={handleSelectRestaurant}
          />
        </ListContainer>
      </main>
      <aside>
        {selected && (
          <RestaurantDetailModal
            restaurant={selected}
            onClose={handleDeselectRestaurant}
          />
        )}
        {isAddModalOpen && (
          <AddRestaurantModal
            onAdd={handleAddRestaurant}
            onClose={handleCloseAddModal}
          />
        )}
      </aside>
    </>
  );
}

const FilterContainer = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  margin-top: 24px;
`;

const ListContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  margin: 16px 0;
`;

export default App;
