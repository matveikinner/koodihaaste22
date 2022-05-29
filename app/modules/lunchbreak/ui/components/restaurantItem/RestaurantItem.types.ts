import { MouseEvent } from "react";
import { Restaurant } from "@lunchbreak/domain/models";

interface RestaurantItemProps {
  restaurant: Restaurant;
  isSelected: boolean;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

export default RestaurantItemProps;
