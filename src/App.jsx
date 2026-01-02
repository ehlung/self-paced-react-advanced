import "./App.css";
import styled from "styled-components";

import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetailModal from "./components/RestaurantDetailModal";
import AddRestaurantModal from "./components/AddRestaurantModal";

import useRestaurantData from "./hooks/useRestaurantData";
import useRestaurantModal from "./hooks/useRestaurantModal";

function App() {
  const { selected } = useRestaurantData();
  const { isAddModalOpen } = useRestaurantModal();

  return (
    <>
      <Header />
      <main>
        <FilterContainer>
          <CategoryFilter />
        </FilterContainer>
        <ListContainer>
          <RestaurantList />
        </ListContainer>
      </main>
      <aside>
        {selected && <RestaurantDetailModal />}
        {isAddModalOpen && <AddRestaurantModal />}
      </aside>
    </>
  );
}

const FilterContainer = styled.section`
  padding: 0 16px;
  margin-top: 24px;
`;

const ListContainer = styled.section`
  padding: 0 16px;
  margin: 16px 0;
`;

export default App;
