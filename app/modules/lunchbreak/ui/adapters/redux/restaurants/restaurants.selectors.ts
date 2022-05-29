import { RootState } from "@core/ui/frameworks/redux/redux.config";
import { RestaurantState } from "./restaurants.types";

export const selectRestaurantsState = (state: RootState): RestaurantState => state.lunchbreak.restaurant;
