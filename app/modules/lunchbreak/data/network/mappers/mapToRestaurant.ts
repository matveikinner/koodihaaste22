import { Restaurant } from "@lunchbreak/domain/models";
import RestaurantsNetwork from "../models/restaurantsNetwork";
import { mapToDish } from "./mapToDish";

export const mapToRestaurant = (
  { id, name, openingHours, votes, dishes }: RestaurantsNetwork.Restaurant,
  city: string
): Restaurant => ({
  id,
  name,
  openingHours,
  votes,
  dishes: dishes.map((dish) => mapToDish(dish)),
  city,
});
