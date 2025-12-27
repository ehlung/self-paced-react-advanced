import { useContext } from "react";
import RestaurantDataContext from "../contexts/RestaurantDataContext";

const useRestaurantDataContext = () => {
  const context = useContext(RestaurantDataContext);

  if (context === null) {
    throw new Error(
      "useRestaurantDataContext는 RestaurantDataProvider 내부에서만 사용할 수 있습니다."
    );
  }

  return context;
};

export default useRestaurantDataContext;
