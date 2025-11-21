import { useContext } from "react";
import "./App.css";
import styled from "styled-components";

import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetailModal from "./components/RestaurantDetailModal";
import AddRestaurantModal from "./components/AddRestaurantModal";
import RestaurantContext from "./contexts/RestaurantContext";

function App() {
  const { selected, isAddModalOpen } = useContext(RestaurantContext);

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
