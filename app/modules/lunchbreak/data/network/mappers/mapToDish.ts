import { Dish } from "@lunchbreak/domain/models";
import RestaurantsNetwork from "../models/restaurantsNetwork";

export const mapToDish = ({ name, price, attributes }: RestaurantsNetwork.Dish): Dish => ({
  name,
  price,
  attributes,
});
