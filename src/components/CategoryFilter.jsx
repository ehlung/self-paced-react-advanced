import styled from "styled-components";
import useRestaurantDataContext from "../hooks/useRestaurantDataContext";

const OPTIONS = ["전체", "한식", "중식", "일식", "양식", "아시안", "기타"];

export default function CategoryFilter() {
  const { category, setCategory } = useRestaurantDataContext();

  return (
    <StyledSelect
      name="category"
      id="main-category-filter"
      aria-label="음식점 카테고리 필터"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      {OPTIONS.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </StyledSelect>
  );
}

const StyledSelect = styled.select`
  padding: 8px;
  height: 44px;
  min-width: 125px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  background: transparent;
  font-size: 16px;
`;
