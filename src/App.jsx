import { useCallback, useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import { useEffect } from "react";

import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetailModal from "./components/RestaurantDetailModal";
import AddRestaurantModal from "./components/AddRestaurantModal";

const API_URL = "http://localhost:3000/restaurants";

function App() {
  const { selected, fetchRestaurants } = useRestaurantDataContext();
  const { isAddModalOpen } = useRestaurantModalContext();

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

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
            onClose={handleCloseModal}
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
  /* .restaurant-filter-container */
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  margin-top: 24px;
`;

const ListContainer = styled.section`
  /* .restaurant-list-container */
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  margin: 16px 0;
`;

export default App;
