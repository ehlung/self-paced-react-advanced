import styled from "styled-components";
import { typography } from "../styles/common";
import useRestaurantDataContext from "../hooks/useRestaurantDataContext";

const categoryIcon = {
  한식: "/category-korean.png",
  중식: "/category-chinese.png",
  일식: "/category-japanese.png",
  양식: "/category-western.png",
  아시안: "/category-asian.png",
  기타: "/category-etc.png",
};

export default function RestaurantList() {
  const { filteredRestaurants, selectRestaurant } = useRestaurantDataContext();

  return (
    <List>
      {filteredRestaurants.map((restaurant) => (
        <ListItem
          key={restaurant.id}
          onClick={() => selectRestaurant(restaurant)}
        >
          <Category>
            <CategoryIcon
              src={categoryIcon[restaurant.category] ?? "/category-etc.png"}
              alt={restaurant.category}
            />
          </Category>
          <Info>
            <RestaurantName>{restaurant.name}</RestaurantName>
            <RestaurantDescription>
              {restaurant.description}
            </RestaurantDescription>
          </Info>
        </ListItem>
      ))}
    </List>
  );
}

const List = styled.ul``;

const ListItem = styled.li`
  display: flex;
  align-items: flex-start;
  padding: 16px 8px;
  border-bottom: 1px solid #e9eaed;
  cursor: pointer;
`;

const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  min-width: 64px;
  min-height: 64px;
  margin-right: 16px;
  border-radius: 50%;
  background: var(--lighten-color);
`;

const CategoryIcon = styled.img`
  width: 36px;
  height: 36px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const RestaurantName = styled.h3`
  margin: 0;
  ${typography.subtitle}
`;

const RestaurantDescription = styled.p`
  display: -webkit-box;
  padding-top: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  ${typography.body}
`;
