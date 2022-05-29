import { Meta } from "@core/domain/models";
import { Restaurant } from "@lunchbreak/domain/models";

export type RestaurantState = {
  restaurants: Restaurant[];
  meta: Meta;
};
