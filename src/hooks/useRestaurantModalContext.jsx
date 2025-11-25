import { useContext } from "react";
import RestaurantModalContext from "../contexts/RestaurantModalContext";

const useRestaurantModalContext = () => {
  const context = useContext(RestaurantModalContext);

  if (context === null) {
    throw new Error(
      "useRestaurantModalContext는 RestaurantModalProvider 내부에서만 사용할 수 있습니다."
    );
  }

  return context;
};

export default useRestaurantModalContext;
